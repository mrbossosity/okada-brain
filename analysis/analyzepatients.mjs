import fs from "fs";
import path from "path";

// 1. LOAD SCHEMA & FILES
const schemaPath = "./master_schema.json";
if (!fs.existsSync(schemaPath)) {
    console.error(
        "Error: master_schema.json not found. Run build_schema.mjs first!",
    );
    process.exit(1);
}

const { headers, schema } = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const PATIENT_DIR = "./simulated_patients";
const files = fs.readdirSync(PATIENT_DIR).filter((f) => f.endsWith(".json"));

const matrix = [];

console.log(`Starting analysis on ${files.length} patient records...`);

// 2. PASS 1: TRANSFORMATION (Flattening JSON to Matrix)
files.forEach((file, index) => {
    const data = JSON.parse(
        fs.readFileSync(path.join(PATIENT_DIR, file), "utf8"),
    );
    const row = {};

    // Initialize every possible header to 0
    headers.forEach((h) => (row[h] = 0));

    // A. Map Gender to Discrete Flags
    const gender = data.patient_info?.gender?.toLowerCase();
    if (gender === "male") row["is_male"] = 1;
    if (gender === "female") row["is_female"] = 1;

    // B. Map Age to Decade Bins
    const age = data.patient_info?.age;
    if (age < 20) row["age_10s"] = 1;
    else if (age < 30) row["age_20s"] = 1;
    else if (age < 40) row["age_30s"] = 1;
    else if (age < 50) row["age_40s"] = 1;
    else if (age < 60) row["age_50s"] = 1;
    else if (age < 70) row["age_60s"] = 1;
    else if (age < 80) row["age_70s"] = 1;
    else row["age_80s+"] = 1;

    // C. Map Key Points (FST)
    data["key points"].forEach((pt) => {
        const id = pt.id.toLowerCase();
        row[`${id}_fever`] = pt.fever || 0;
        row[`${id}_stiffness`] = pt.stiffness || 0;
        row[`${id}_tenderness`] = pt.tenderness || 0;
    });

    // D. Map Diseases
    data.diseases.forEach((d) => {
        const dId = (typeof d === "string" ? d : d.id).toLowerCase();
        const key = `has_${dId}`;
        if (headers.includes(key)) row[key] = 1;
    });

    // E. Map Pain Tags
    data.pain.forEach((p) => {
        const key = `pain_${p.id.toLowerCase()}_${p.side.toLowerCase()}_${p.sensation.toLowerCase()}`;
        if (headers.includes(key)) row[key] = 1;
    });

    matrix.push(row);

    // Progress Debug for the first file
    if (index === 0) {
        const active = Object.keys(row).filter((k) => row[k] > 0);
        console.log(`\n[DEBUG] Sample File: ${file}`);
        console.log(`Active Metrics (${active.length}):`, active);
    }
});

// 3. PASS 2: THE PROBABILITY ENGINE (Calculating Correlations)
const knowledgeGraph = {
    totalPatients: matrix.length,
    correlations: {},
    fstBaselines: {},
};

// Logic: Any value > 0 is considered a "hit" for correlation purposes
const isPresent = (val) => val > 0;

headers.forEach((featureA) => {
    const patientsWithA = matrix.filter((r) => isPresent(r[featureA]));
    if (patientsWithA.length === 0) return;

    knowledgeGraph.correlations[featureA] = {};

    // Calculate FST Baselines for Diseases (Average Severity)
    if (featureA.startsWith("has_")) {
        knowledgeGraph.fstBaselines[featureA] = {};
        schema.points.forEach((pt) => {
            schema.pointMetrics.forEach((m) => {
                const k = `${pt}_${m}`;
                const avg =
                    patientsWithA.reduce((sum, r) => sum + r[k], 0) /
                    patientsWithA.length;
                if (avg > 0) {
                    knowledgeGraph.fstBaselines[featureA][k] = parseFloat(
                        avg.toFixed(2),
                    );
                }
            });
        });
    }

    // Calculate Cross-Correlations (P(B|A))
    headers.forEach((featureB) => {
        if (featureA === featureB) return;

        const countBoth = patientsWithA.filter((r) =>
            isPresent(r[featureB]),
        ).length;
        const probability = countBoth / patientsWithA.length;

        // Threshold: Only store correlations > 1% to keep file size down
        if (probability > 0.01) {
            knowledgeGraph.correlations[featureA][featureB] = parseFloat(
                probability.toFixed(4),
            );
        }
    });
});

// 4. SAVE THE BRAIN
fs.writeFileSync(
    "./knowledge_graph.json",
    JSON.stringify(knowledgeGraph, null, 2),
);

console.log(`\nSuccess! "Brain" generated at ./knowledge_graph.json`);
console.log(
    `Mapped ${files.length} patients across ${headers.length} parameters.`,
);
