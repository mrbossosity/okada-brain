import { anatomicalPoints } from "./points-data.js";

const Store = {
    patientVector: {},
    activeId: null,
    concerns: [], // Track diseases and pain tags
    editingConcernId: null, // Track if we are editing an existing tag

    update(id, data) {
        this.patientVector[id] = { ...data };
        this.syncUI(id);
    },

    syncUI(id) {
        const el = document.getElementById(id);
        if (!el) return;
        const data = this.patientVector[id];

        if (
            !data ||
            (data.heat === 0 && data.stiffness === 0 && data.pain === 0)
        ) {
            el.style.setProperty("fill", "rgba(0,0,0,0.02)", "important");
            el.style.setProperty("stroke", "rgba(0,0,0,0.15)", "important");
            el.style.setProperty("stroke-width", "0.5px", "important");
            delete this.patientVector[id];
            return;
        }

        const heatAlpha = 0.15 + (data.heat / 5) * 0.75;
        el.style.setProperty(
            "fill",
            `rgba(231, 76, 60, ${heatAlpha})`,
            "important",
        );

        let strokeColor = "rgba(52, 152, 219, 0.4)";
        if (data.pain > 0) {
            const p = data.pain / 5;
            const r = Math.round(52 + p * 140);
            const g = Math.round(152 - p * 152);
            const b = Math.round(219 - p * 176);
            strokeColor = `rgb(${r}, ${g}, ${b})`;
        }
        el.style.setProperty("stroke", strokeColor, "important");
        el.style.setProperty(
            "stroke-width",
            `${0.5 + data.stiffness * 1.5}px`,
            "important",
        );
    },
};

const tooltip = document.getElementById("tooltip");
const viewContainers = {
    front: document.getElementById("body-map-front"),
    head: document.getElementById("body-map-head"),
};

// INITIALIZE SVG POINTS
anatomicalPoints.forEach((pt) => {
    const container = viewContainers[pt.view];
    if (container) {
        if (!document.getElementById(pt.id)) {
            container.insertAdjacentHTML("beforeend", pt.svgCode);
        }

        const el = document.getElementById(pt.id);
        if (el) {
            el.removeAttribute("style");
            Store.syncUI(pt.id);

            el.onclick = (e) => {
                e.stopPropagation();
                openModal(pt.id);
            };

            el.onmouseenter = () => {
                tooltip.innerText = pt.id.replace(/-/g, " ");
                tooltip.style.display = "block";
                if (!Store.patientVector[pt.id]) {
                    el.style.setProperty(
                        "fill",
                        "rgba(0,0,0,0.1)",
                        "important",
                    );
                } else {
                    el.style.setProperty(
                        "filter",
                        "brightness(1.1)",
                        "important",
                    );
                }
            };

            el.onmousemove = (e) => {
                tooltip.style.left = e.pageX + 15 + "px";
                tooltip.style.top = e.pageY + 15 + "px";
            };

            el.onmouseleave = () => {
                tooltip.style.display = "none";
                el.style.setProperty("filter", "none", "important");
                Store.syncUI(pt.id);
            };
        }
    }
});

// --- POINT ASSESSMENT MODAL LOGIC ---
const modal = document.getElementById("input-modal");
let tempState = { heat: 0, stiffness: 0, pain: 0 };

window.setMetric = (m, v) => {
    tempState[m] = tempState[m] === v ? 0 : v;
    updateModalUI();
};

function openModal(id) {
    Store.activeId = id;
    tempState = {
        ...(Store.patientVector[id] || { heat: 0, stiffness: 0, pain: 0 }),
    };
    document.getElementById("modal-title").innerText = id
        .replace(/-/g, " ")
        .toUpperCase();
    updateModalUI();
    modal.style.display = "flex";
}

function updateModalUI() {
    document
        .querySelectorAll(".button-scale button")
        .forEach((b) => b.classList.remove("active"));
    ["heat", "stiffness", "pain"].forEach((m) => {
        const val = tempState[m];
        if (val > 0) {
            const btn = document.querySelector(
                `.button-scale[data-metric="${m}"] button:nth-child(${val})`,
            );
            if (btn) btn.classList.add("active");
        }
    });
}

document.getElementById("btn-save").onclick = () => {
    Store.update(Store.activeId, tempState);
    modal.style.display = "none";
};

document.getElementById("btn-clear").onclick = () => {
    Store.update(Store.activeId, { heat: 0, stiffness: 0, pain: 0 });
    modal.style.display = "none";
};

document.getElementById("btn-cancel").onclick = () =>
    (modal.style.display = "none");

// --- VIEW & EXPORT ---
window.switchView = (v) => {
    document
        .querySelectorAll(".tab-btn")
        .forEach((b) =>
            b.classList.toggle("active", b.innerText.toLowerCase().includes(v)),
        );
    document
        .querySelectorAll(".view-group")
        .forEach((g) => g.classList.toggle("active", g.id === `view-${v}`));
};

window.exportJSON = () => {
    const exportData = {
        assessments: Store.patientVector,
        concerns: Store.concerns,
        notes: document.getElementById("clinical-notes").value,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `patient_assessment.json`;
    a.click();
};

// --- DISEASE & PAIN MODAL DATA ---
const diseaseData = {
    respiratory: ["Asthma", "COPD", "Bronchitis"],
    cardiovascular: ["Hypertension", "Arrhythmia", "CAD"],
    endocrine: ["Diabetes Type 1", "Diabetes Type 2", "Hypothyroidism"],
    nervous: ["Sciatica", "Neuropathy", "Multiple Sclerosis"],
};

// Open/Close Handlers
window.openConcernsModal = () =>
    (document.getElementById("disease-modal").style.display = "flex");
window.openAchesModal = () =>
    (document.getElementById("pain-modal").style.display = "flex");

window.closeModal = (id) => {
    document.getElementById(id).style.display = "none";
    Store.editingConcernId = null; // Clear edit state on close
    // Clear inputs for next time
    if (id === "pain-modal") document.getElementById("pain-part").value = "";
    if (id === "disease-modal") {
        document.getElementById("disease-system").value = "";
        document.getElementById("disease-name").innerHTML =
            '<option value="">Select System First...</option>';
    }
};

window.updateDiseaseList = () => {
    const system = document.getElementById("disease-system").value;
    const nameSelect = document.getElementById("disease-name");
    nameSelect.innerHTML = '<option value="">Select Diagnosis...</option>';
    if (diseaseData[system]) {
        diseaseData[system].forEach((disease) => {
            const opt = document.createElement("option");
            opt.value = disease;
            opt.innerText = disease;
            nameSelect.appendChild(opt);
        });
    }
};

// --- TAG TRACKING LOGIC ---
const renderConcerns = () => {
    const container = document.getElementById("concerns-list");
    if (!container) return;
    container.innerHTML = "";

    Store.concerns.forEach((item) => {
        const div = document.createElement("div");
        div.className = "tag-item";
        div.onclick = () => editConcern(item.id);

        const label =
            item.type === "disease"
                ? `<b>${item.name}</b>`
                : `<b>${item.side !== "N/A" ? item.side + " " : ""}${item.part}</b> (${item.sensation})`;

        div.innerHTML = `
            <div class="tag-content">${label}</div>
            <div class="tag-remove" onclick="event.stopPropagation(); window.removeConcern('${item.id}')">&times;</div>
        `;
        container.appendChild(div);
    });
};

window.removeConcern = (id) => {
    Store.concerns = Store.concerns.filter((c) => c.id !== id);
    renderConcerns();
};

const editConcern = (id) => {
    const item = Store.concerns.find((c) => c.id === id);
    Store.editingConcernId = id;

    if (item.type === "disease") {
        document.getElementById("disease-system").value = item.system;
        window.updateDiseaseList();
        document.getElementById("disease-name").value = item.name;
        window.openConcernsModal();
    } else {
        document.getElementById("pain-part").value = item.part;
        document.getElementById("pain-side").value = item.side;
        document.getElementById("pain-sensation").value = item.sensation;
        window.openAchesModal();
    }
};

window.saveDisease = () => {
    const system = document.getElementById("disease-system").value;
    const name = document.getElementById("disease-name").value;
    if (!name) return;

    const data = {
        id: Store.editingConcernId || Date.now().toString(),
        type: "disease",
        system,
        name,
    };

    if (Store.editingConcernId) {
        const index = Store.concerns.findIndex(
            (c) => c.id === Store.editingConcernId,
        );
        Store.concerns[index] = data;
    } else {
        Store.concerns.push(data);
    }

    window.closeModal("disease-modal");
    renderConcerns();
};

window.savePain = () => {
    const part = document.getElementById("pain-part").value;
    const side = document.getElementById("pain-side").value;
    const sensation = document.getElementById("pain-sensation").value;
    if (!part) return;

    const data = {
        id: Store.editingConcernId || Date.now().toString(),
        type: "pain",
        part,
        side,
        sensation,
    };

    if (Store.editingConcernId) {
        const index = Store.concerns.findIndex(
            (c) => c.id === Store.editingConcernId,
        );
        Store.concerns[index] = data;
    } else {
        Store.concerns.push(data);
    }

    window.closeModal("pain-modal");
    renderConcerns();
};

// Global click handler
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
    if (event.target.classList.contains("modal"))
        event.target.style.display = "none";
};
