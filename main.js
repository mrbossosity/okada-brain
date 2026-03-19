import { anatomicalPoints } from "./points-data.js";

const Store = {
    patientVector: {},
    activeId: null,

    update(id, data) {
        this.patientVector[id] = { ...data };
        this.syncUI(id);
    },

    syncUI(id) {
        const el = document.getElementById(id);
        if (!el) return;
        const data = this.patientVector[id];

        // 1. DEFAULT: Transparent outlines
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

        // 2. FEVER/HEAT: Fill Opacity (Level 1: 0.2 to Level 5: 0.9)
        const heatAlpha = 0.15 + (data.heat / 5) * 0.75;
        el.style.setProperty(
            "fill",
            `rgba(231, 76, 60, ${heatAlpha})`,
            "important",
        );

        // 3. PAIN: Stroke Color
        let strokeColor = "rgba(52, 152, 219, 0.4)";
        if (data.pain > 0) {
            const p = data.pain / 5;
            const r = Math.round(52 + p * 140);
            const g = Math.round(152 - p * 152);
            const b = Math.round(219 - p * 176);
            strokeColor = `rgb(${r}, ${g}, ${b})`;
        }
        el.style.setProperty("stroke", strokeColor, "important");

        // 4. STIFFNESS: Stroke Weight
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

// INITIALIZE
anatomicalPoints.forEach((pt) => {
    const container = viewContainers[pt.view];
    if (container) {
        // Clear potential duplicates before inserting
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

// MODAL LOGIC
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
    const blob = new Blob([JSON.stringify(Store.patientVector, null, 2)], {
        type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `assessment.json`;
    a.click();
};

// Handle modal clicks outside content to close
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};
