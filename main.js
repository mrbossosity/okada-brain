// 1. KEY POINTS
import { anatomicalPoints } from "./points-data.js";

// 2. STATE: The internal "Vector" memory
const Store = {
    patientVector: {},
    activeId: null,

    update(id, data) {
        this.patientVector[id] = data;
        this.syncUI(id);
    },

    syncUI(id) {
        const el = document.getElementById(id);
        if (!el) return;

        const data = this.patientVector[id];

        // 1. DEACTIVATION LOGIC (Reset to Ghost Gray)
        if (data.heat === 0 && data.stiffness === 0 && data.pain === 0) {
            el.style.setProperty("fill", "rgba(0,0,0,0.05)", "important");
            el.style.setProperty("stroke", "#d3d3d3", "important");
            el.style.setProperty("stroke-width", "1px", "important");
            el.style.setProperty("fill-opacity", "0.3", "important");
            delete this.patientVector[id];
            return;
        }

        // 2. HEAT -> Fill (Red Opacity)
        const heatOpacity = data.heat / 5;
        const finalFillOpacity = 0.1 + heatOpacity * 0.9;
        el.style.setProperty(
            "fill",
            `rgba(231, 76, 60, ${finalFillOpacity})`,
            "important",
        );
        el.style.setProperty("fill-opacity", "1", "important");

        // 3. PAIN/TENDERNESS -> Stroke Color (Blue to Red)
        if (data.pain === 0) {
            el.style.setProperty("stroke", "#3498db", "important");
        } else {
            const p = data.pain / 5;
            const r = Math.round(52 + p * (192 - 52));
            const g = Math.round(152 - p * 152);
            const b = Math.round(219 - p * (219 - 43));
            el.style.setProperty(
                "stroke",
                `rgb(${r}, ${g}, ${b})`,
                "important",
            );
        }

        // 4. STIFFNESS -> Stroke Width
        const thickness = 1 + data.stiffness * 0.7;
        el.style.setProperty("stroke-width", `${thickness}px`, "important");
        el.style.setProperty("paint-order", "stroke fill", "important");
    },
};

// 3. INITIALIZATION
const tooltip = document.getElementById("tooltip");
const viewContainers = {
    front: document.getElementById("body-map-front"),
    head: document.getElementById("body-map-head"),
};

anatomicalPoints.forEach((pt) => {
    const container = viewContainers[pt.view];
    if (container) {
        container.insertAdjacentHTML("beforeend", pt.svgCode);
        const el = document.getElementById(pt.id);

        if (el) {
            el.style.setProperty("fill", "rgba(0,0,0,0.05)", "important");
            el.style.setProperty("stroke", "#d3d3d3", "important");
            el.style.setProperty("stroke-width", "1px", "important");
            el.style.setProperty("fill-opacity", "0.3", "important");
            el.style.cursor = "pointer";

            el.onmouseenter = (e) => {
                tooltip.innerText = pt.id.replace(/-/g, " ").toUpperCase();
                tooltip.style.display = "block";
            };

            el.onmousemove = (e) => {
                tooltip.style.left = e.pageX + 15 + "px";
                tooltip.style.top = e.pageY + 15 + "px";
            };

            el.onmouseleave = () => {
                tooltip.style.display = "none";
            };

            el.onclick = () => openModal(pt.id);
        }
    }
});

// 4. MODAL & BUTTON SCALE LOGIC
const modal = document.getElementById("input-modal");
let tempState = { heat: 0, stiffness: 0, pain: 0 };

window.setMetric = function (metric, value) {
    // Toggle logic: click same value to reset to 0
    tempState[metric] = tempState[metric] === value ? 0 : value;
    updateModalUI();
};

function openModal(id) {
    Store.activeId = id;
    const existing = Store.patientVector[id] || {
        heat: 0,
        stiffness: 0,
        pain: 0,
    };

    tempState = { ...existing };

    document.getElementById("modal-title").innerText =
        `Point: ${id.replace(/-/g, " ").toUpperCase()}`;

    updateModalUI();
    modal.style.display = "block";
}

function updateModalUI() {
    ["heat", "stiffness", "pain"].forEach((metric) => {
        const container = document.querySelector(
            `.button-scale[data-metric="${metric}"]`,
        );
        if (!container) return;

        const buttons = container.querySelectorAll("button");
        buttons.forEach((btn, index) => {
            const val = index + 1;
            if (tempState[metric] === val) {
                btn.classList.add("active");
                // Scale is handled via CSS transition for smoothness,
                // but we keep the inline style for that extra "pop"
                btn.style.transform = "scale(1.15)";
                btn.style.zIndex = "2";
            } else {
                btn.classList.remove("active");
                btn.style.transform = "scale(1)";
                btn.style.zIndex = "1";
            }
        });
    });
}

document.getElementById("btn-save").onclick = () => {
    Store.update(Store.activeId, { ...tempState });
    modal.style.display = "none";
};

document.getElementById("btn-clear").onclick = () => {
    Store.update(Store.activeId, { heat: 0, stiffness: 0, pain: 0 });
    modal.style.display = "none";
};

document.getElementById("btn-cancel").onclick = () =>
    (modal.style.display = "none");

// Close modal when clicking the outside overlay
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// 5. VIEW SWITCHING LOGIC (Fixed Match Logic)
window.switchView = function (viewId) {
    // Select buttons and toggle based on the viewId passed in the onclick
    document.querySelectorAll(".tab-btn").forEach((btn) => {
        const onClickAttr = btn.getAttribute("onclick") || "";
        if (onClickAttr.includes(`'${viewId}'`)) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    document.querySelectorAll(".view-group").forEach((group) => {
        group.classList.toggle("active", group.id === `view-${viewId}`);
    });
};

// 6. EXPORT LOGIC
window.exportJSON = function () {
    // We create a structured object for the export
    const exportData = {
        metadata: {
            timestamp: new Date().toISOString(),
            totalPointsMarked: Object.keys(Store.patientVector).length,
        },
        frontView: {},
        headView: {},
    };

    // Define the "Head-to-Toe" sorting order for the keys
    // You can re-order these strings to match your preference
    const sortOrder = [
        "head",
        "neck",
        "shoulder-left",
        "shoulder-right",
        "chest",
        "abdomen",
        "hip-left",
        "hip-right",
        "knee-left",
        "knee-right",
        "ankle-left",
        "ankle-right",
    ];

    // Sort and distribute points to their respective views
    anatomicalPoints.forEach((pt) => {
        if (Store.patientVector[pt.id]) {
            const viewKey = pt.view === "front" ? "frontView" : "headView";
            exportData[viewKey][pt.id] = Store.patientVector[pt.id];
        }
    });

    // Create the file download
    const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(exportData, null, 4));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "patient_assessment.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};
