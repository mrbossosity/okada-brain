import fs from "fs";
import { anatomicalPoints } from "../points-data.js";
import { diseases } from "../disease-data.js";
import { regions } from "../regions-data.js";

const masterSchema = {
    points: anatomicalPoints.map((pt) => pt.id.toLowerCase()),
    pointMetrics: ["fever", "stiffness", "tenderness"],
    diagnoses: diseases.map((d) => d.id.toLowerCase()),
    painRegions: regions.map((r) => r.id.toLowerCase()),
    painSides: ["n/a", "left", "right", "bilateral"],
    painSensations: ["dull", "sharp", "numb", "tingling", "shooting"],
    // Added specific categories
    genders: ["male", "female"],
    ageGroups: [
        "age_10s",
        "age_20s",
        "age_30s",
        "age_40s",
        "age_50s",
        "age_60s",
        "age_70s",
        "age_80s+",
    ],
};

// Start with empty headers
const flatHeaders = [];

// 1. Add Gender Categories
masterSchema.genders.forEach((g) => flatHeaders.push(`is_${g}`));

// 2. Add Age Decades
masterSchema.ageGroups.forEach((a) => flatHeaders.push(a));

// 3. Add Key Points (FST)
masterSchema.points.forEach((id) => {
    masterSchema.pointMetrics.forEach((metric) => {
        flatHeaders.push(`${id}_${metric}`);
    });
});

// 4. Add Diagnoses
masterSchema.diagnoses.forEach((id) => {
    flatHeaders.push(`has_${id}`);
});

// 5. Add Regional Pain combinations
masterSchema.painRegions.forEach((id) => {
    masterSchema.painSides.forEach((side) => {
        masterSchema.painSensations.forEach((sensation) => {
            flatHeaders.push(`pain_${id}_${side}_${sensation}`);
        });
    });
});

const output = { schema: masterSchema, headers: flatHeaders };
fs.writeFileSync("./master_schema.json", JSON.stringify(output, null, 2));
console.log(`Schema built with ${flatHeaders.length} discrete parameters.`);
