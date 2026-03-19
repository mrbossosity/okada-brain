import { anatomicalPoints } from "./points-data.js";
import { diseases } from "./disease-data.js";
import { regions } from "./regions-data.js";

const Store = {
    patientVector: {},
    activeId: null,
    concerns: [],
    editingConcernId: null,

    update(id, data) {
        this.patientVector[id] = { id, ...data };
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

// INITIALIZE PAIN REGIONS DROPDOWN
const painPartSelect = document.getElementById("pain-part");
if (painPartSelect) {
    regions.forEach((reg) => {
        const opt = document.createElement("option");
        opt.value = reg.id;
        opt.innerText = reg.name;
        painPartSelect.appendChild(opt);
    });
}

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
    const existing = Store.patientVector[id] || {
        heat: 0,
        stiffness: 0,
        pain: 0,
    };
    const { id: _, ...metrics } = existing;
    tempState = { ...metrics };

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
    document.querySelectorAll(".tab-btn").forEach((b) => {
        const text = b.innerText.toLowerCase();
        const isActive =
            (v === "front" && text.includes("body")) ||
            (v === "head" && text.includes("head"));
        b.classList.toggle("active", isActive);
    });
    document
        .querySelectorAll(".view-group")
        .forEach((g) => g.classList.toggle("active", g.id === `view-${v}`));
};

window.exportJSON = () => {
    const exportData = {
        "key points": Object.values(Store.patientVector),
        diseases: Store.concerns.filter((c) => c.system),
        pain: Store.concerns.filter((c) => c.part),
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

// --- DISEASE & PAIN MODAL LOGIC ---
window.openConcernsModal = () =>
    (document.getElementById("disease-modal").style.display = "flex");
window.openAchesModal = () =>
    (document.getElementById("pain-modal").style.display = "flex");

window.closeModal = (id) => {
    document.getElementById(id).style.display = "none";
    Store.editingConcernId = null;
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
    const filtered = diseases.filter((d) => d.system === system);
    filtered.forEach((d) => {
        const opt = document.createElement("option");
        opt.value = d.id;
        opt.innerText = d.name;
        nameSelect.appendChild(opt);
    });
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

        let label;
        if (item.system) {
            label = `<b>${item.name}</b>`;
        } else {
            const sideStr =
                item.side && item.side !== "N/A" ? `${item.side} ` : "";
            label = `<b>${item.sensation} ${sideStr}${item.part} Pain</b>`;
        }

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

    if (item.system) {
        document.getElementById("disease-system").value = item.system;
        window.updateDiseaseList();
        const matchingDisease = diseases.find((d) => d.name === item.name);
        if (matchingDisease)
            document.getElementById("disease-name").value = matchingDisease.id;
        window.openConcernsModal();
    } else {
        // Find ID by name for the dropdown
        const matchingRegion = regions.find((r) => r.name === item.part);
        if (matchingRegion)
            document.getElementById("pain-part").value = matchingRegion.id;

        document.getElementById("pain-side").value = item.side;
        document.getElementById("pain-sensation").value = item.sensation;
        window.openAchesModal();
    }
};

window.saveDisease = () => {
    const system = document.getElementById("disease-system").value;
    const diseaseId = document.getElementById("disease-name").value;
    if (!diseaseId) return;

    const diseaseInfo = diseases.find((d) => d.id === diseaseId);
    const data = {
        id: Store.editingConcernId || diseaseId, // Use the real ID
        system,
        name: diseaseInfo.name,
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
    const regionId = document.getElementById("pain-part").value;
    const side = document.getElementById("pain-side").value;
    const sensation = document.getElementById("pain-sensation").value;
    if (!regionId) return;

    const regionInfo = regions.find((r) => r.id === regionId);

    const data = {
        id: Store.editingConcernId || regionId, // Use the real ID
        part: regionInfo.name,
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

window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
    if (event.target.classList.contains("modal"))
        event.target.style.display = "none";
};
