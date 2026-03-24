import fs from "fs";

if (!fs.existsSync("./knowledge_graph.json")) {
    console.error(
        "Error: knowledge_graph.json not found. Run analyze_patients.mjs first!",
    );
    process.exit(1);
}
const brain = JSON.parse(fs.readFileSync("./knowledge_graph.json", "utf8"));

const args = process.argv.slice(2);
const mode = args[0];
const targets = args.slice(1); // Supports multiple targets for 'diff' mode

if (!mode || targets.length === 0) {
    console.log(`
Usage: 
  node query.mjs point <id>               (Single point analysis)
  node query.mjs disease <id>             (Disease symptom profile)
  node query.mjs diff <id1> <id2> <id3>   (Differential diagnosis)
    `);
    process.exit();
}

// --- QUERY LOGIC ---

if (mode === "point") {
    const target = targets[0];
    const key = `${target.toLowerCase()}_tenderness`;
    const correlations = brain.correlations[key] || {};

    console.log(`\n--- Predictions for Point: ${target} (Tenderness) ---`);

    const results = Object.entries(correlations)
        .filter(([k]) => k.startsWith("has_"))
        .map(([disKey, prob]) => {
            const diseaseId = disKey.replace("has_", "");
            const baselines = brain.fstBaselines[disKey] || {};

            return {
                Disease: diseaseId.toUpperCase(),
                Probability: (prob * 100).toFixed(1) + "%",
                Avg_Fever: baselines[`${target.toLowerCase()}_fever`] || "0.00",
                Avg_Stiff:
                    baselines[`${target.toLowerCase()}_stiffness`] || "0.00",
                Avg_Tender:
                    baselines[`${target.toLowerCase()}_tenderness`] || "0.00",
            };
        })
        .sort((a, b) => parseFloat(b.Probability) - parseFloat(a.Probability));

    console.table(results);
} else if (mode === "disease") {
    const target = targets[0];
    const disKey = `has_${target.toLowerCase()}`;
    const correlations = brain.correlations[disKey] || {};
    const baselines = brain.fstBaselines[disKey] || {};

    console.log(
        `\n--- Most Common Symptoms & Baselines for: ${target.toUpperCase()} ---`,
    );

    const results = Object.entries(correlations)
        .filter(
            ([k]) =>
                !k.startsWith("has_") &&
                !k.startsWith("is_") &&
                !k.startsWith("age_"),
        )
        .map(([symp, prob]) => ({
            Symptom: symp,
            Frequency: (prob * 100).toFixed(1) + "%",
            Avg_Severity: baselines[symp] || "0.00",
        }))
        .sort((a, b) => parseFloat(b.Frequency) - parseFloat(a.Frequency))
        .slice(0, 15);

    console.table(results);

    console.log(`\n--- Demographic Risk Factors ---`);
    const risks = Object.entries(correlations)
        .filter(([k]) => k.startsWith("is_") || k.startsWith("age_"))
        .map(([factor, prob]) => ({
            Factor: factor.replace("is_", "").replace("age_", "Age: "),
            Probability: (prob * 100).toFixed(1) + "%",
        }))
        .sort((a, b) => parseFloat(b.Probability) - parseFloat(a.Probability));

    console.table(risks);
} else if (mode === "diff") {
    console.log(`\n--- Differential Diagnosis for: ${targets.join(", ")} ---`);

    const diseaseScores = {};
    const symptomCount = targets.length;

    targets.forEach((t) => {
        const key = `${t.toLowerCase()}_tenderness`;
        const correlations = brain.correlations[key] || {};

        Object.entries(correlations).forEach(([feature, prob]) => {
            if (feature.startsWith("has_")) {
                if (!diseaseScores[feature]) {
                    diseaseScores[feature] = {
                        hits: 0,
                        totalProb: 0,
                        diseases: feature.replace("has_", ""),
                    };
                }
                diseaseScores[feature].hits += 1;
                diseaseScores[feature].totalProb += prob;
            }
        });
    });

    const results = Object.values(diseaseScores)
        // Only show diseases that match at least one symptom,
        // but prioritize those that match ALL symptoms (the intersection)
        .map((data) => ({
            Disease: data.diseases.toUpperCase(),
            Matches: `${data.hits}/${symptomCount}`,
            Confidence:
                ((data.totalProb / symptomCount) * 100).toFixed(1) + "%",
            Score: data.hits * 100 + data.totalProb * 10, // Weight hits higher than raw prob
        }))
        .sort((a, b) => b.Score - a.Score)
        .slice(0, 10);

    console.table(results);
    console.log(
        "> Note: Confidence is the average probability across all provided symptoms.",
    );
}
