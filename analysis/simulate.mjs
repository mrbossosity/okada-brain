import fs from "fs";
import path from "path";

// Import your existing logic
import { diseases } from "../disease-data.js";
import { anatomicalPoints } from "../points-data.js";
import { regions } from "../regions-data.js";

// --- CONFIGURATION ---
const NUM_SAMPLES = 5000;
const OUTPUT_DIR = "./simulated_patients";

// Metric definitions matching your schema
const SIDES = ["n/a", "left", "right", "bilateral"];
const SENSATIONS = ["dull", "sharp", "numb", "tingling", "shooting"];
const GENDERS = ["male", "female", "other"];

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

for (let i = 1; i <= NUM_SAMPLES; i++) {
    const patientData = {
        patient_info: {
            id: `SIM-${i.toString().padStart(4, "0")}`,
            age: getRandomInt(18, 85),
            gender: getRandom(GENDERS),
        },
        "key points": [],
        diseases: [],
        pain: [],
        notes: "Simulated patient record for statistical indexing.",
    };

    // 1. Key Points (4-10) using FST (Fever, Stiffness, Tenderness)
    const numPoints = getRandomInt(4, 10);
    const usedPoints = new Set();
    while (usedPoints.size < numPoints) {
        const pt = getRandom(anatomicalPoints);
        const lowerId = pt.id.toLowerCase();
        if (!usedPoints.has(lowerId)) {
            usedPoints.add(lowerId);
            patientData["key points"].push({
                id: lowerId,
                fever: getRandomInt(0, 5),
                stiffness: getRandomInt(0, 5),
                tenderness: getRandomInt(0, 5),
            });
        }
    }

    // 2. Diseases (1-2)
    const numDiseases = getRandomInt(1, 2);
    for (let j = 0; j < numDiseases; j++) {
        const d = getRandom(diseases);
        patientData.diseases.push({
            id: d.id.toLowerCase(),
            system: d.system.toLowerCase(),
            name: d.name,
        });
    }

    // 3. Tagged Pains (1-2) using expanded descriptors
    const numPains = getRandomInt(1, 2);
    for (let k = 0; k < numPains; k++) {
        const reg = getRandom(regions);
        patientData.pain.push({
            id: reg.id.toLowerCase(),
            part: reg.name,
            side: getRandom(SIDES),
            sensation: getRandom(SENSATIONS),
        });
    }

    const fileName = `patient_${i.toString().padStart(3, "0")}.json`;
    fs.writeFileSync(
        path.join(OUTPUT_DIR, fileName),
        JSON.stringify(patientData, null, 2),
    );
}

console.log(
    `Successfully generated ${NUM_SAMPLES} files in ${path.resolve(OUTPUT_DIR)}`,
);
