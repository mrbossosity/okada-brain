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
            el.style.setProperty("stroke", "#d3d3d3", "important"); // Ghost Gray
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
            el.style.setProperty("stroke", "#3498db", "important"); // Active Blue
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

        // 4. STIFFNESS -> Stroke Width (Capped for smaller shapes)
        const thickness = 1 + data.stiffness * 0.7;
        el.style.setProperty("stroke-width", `${thickness}px`, "important");
        el.style.setProperty("paint-order", "stroke fill", "important");
    },
};

// 3. INITIALIZATION: Render SVG and attach events
const tooltip = document.getElementById("tooltip");

// Map your view names ("front" and "head") to their HTML container IDs
const viewContainers = {
    front: document.getElementById("body-map-front"),
    head: document.getElementById("body-map-head"),
};

anatomicalPoints.forEach((pt) => {
    const container = viewContainers[pt.view];

    if (container) {
        // Inject the literal string into the correct view
        container.insertAdjacentHTML("beforeend", pt.svgCode);

        const el = document.getElementById(pt.id);
        if (el) {
            // Apply baseline styles
            el.style.setProperty("fill", "rgba(0,0,0,0.05)", "important");
            el.style.setProperty("stroke", "#d3d3d3", "important");
            el.style.setProperty("stroke-width", "1px", "important");
            el.style.setProperty("fill-opacity", "0.3", "important");
            el.style.cursor = "pointer";

            // --- HOVER LOGIC ---
            el.onmouseenter = (e) => {
                // Formatting ID name for cleaner display
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

// 4. MODAL & STEPPER LOGIC
const modal = document.getElementById("input-modal");
const sHeat = document.getElementById("slide-heat");
const sStiff = document.getElementById("slide-stiffness");
const sPain = document.getElementById("slide-pain");

window.adjust = function (id, delta) {
    const slider = document.getElementById(id);
    const newValue = parseInt(slider.value) + delta;

    if (newValue >= 0 && newValue <= 5) {
        slider.value = newValue;
        updateDisplayValues();
    }
};

function openModal(id) {
    Store.activeId = id;
    const existing = Store.patientVector[id] || {
        heat: 0,
        stiffness: 0,
        pain: 0,
    };

    document.getElementById("modal-title").innerText =
        `Point: ${id.replace(/-/g, " ").toUpperCase()}`;
    sHeat.value = existing.heat;
    sStiff.value = existing.stiffness;
    sPain.value = existing.pain;

    updateDisplayValues();
    modal.style.display = "block";
}

function updateDisplayValues() {
    document.getElementById("val-heat").innerText = sHeat.value;
    document.getElementById("val-stiffness").innerText = sStiff.value;
    document.getElementById("val-pain").innerText = sPain.value;
}

[sHeat, sStiff, sPain].forEach((s) => (s.oninput = updateDisplayValues));

document.getElementById("btn-save").onclick = () => {
    Store.update(Store.activeId, {
        heat: parseInt(sHeat.value),
        stiffness: parseInt(sStiff.value),
        pain: parseInt(sPain.value),
    });
    modal.style.display = "none";
};

document.getElementById("btn-clear").onclick = () => {
    Store.update(Store.activeId, { heat: 0, stiffness: 0, pain: 0 });
    modal.style.display = "none";
};

document.getElementById("btn-cancel").onclick = () =>
    (modal.style.display = "none");

// 5. VIEW SWITCHING LOGIC
window.switchView = function (viewId) {
    // 1. Handle Buttons
    document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active");
        if (btn.innerText.toLowerCase().includes(viewId))
            btn.classList.add("active");
    });

    // 2. Handle View Content
    document.querySelectorAll(".view-group").forEach((group) => {
        group.classList.remove("active");
    });

    // Show the selected one (front or head)
    document.getElementById(`view-${viewId}`).classList.add("active");
};
