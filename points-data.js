export const anatomicalPoints = [
    // --- VIEW: HEAD & NECK (Top to Bottom) ---
    {
        id: "crown",
        view: "head",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" id="crown" cx="229.1834" cy="73.681389" rx="17.563999" ry="15.850067"/>',
    },
    {
        id: "L-parietal",
        view: "head",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" id="L-parietal" cx="124.65864" cy="212.47658" rx="17.563999" ry="12.423025"/>',
    },
    {
        id: "R-parietal",
        view: "head",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" id="R-parietal" cx="317.00134" cy="216.76038" rx="17.563999" ry="12.423025"/>',
    },
    {
        id: "L-temple",
        view: "head",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" id="L-temple" cx="103.23962" cy="239.03615" rx="5.5689998" ry="17.991968"/>',
    },
    {
        id: "R-temple",
        view: "head",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" id="R-temple" cx="340.56223" cy="241.17805" rx="5.5689998" ry="17.991968"/>',
    },
    {
        id: "L-parotid",
        view: "head",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" id="L-parotid" cx="129.37082" cy="266.02411" rx="5.9973226" ry="9.4243641"/>',
    },
    {
        id: "R-parotid",
        view: "head",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" id="R-parotid" cx="311.00403" cy="267.30923" rx="5.9973226" ry="9.4243641"/>',
    },
    {
        id: "L-tonsil",
        view: "head",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" id="L-tonsil" cx="88.246315" cy="292.15527" rx="9.8527441" ry="4.283802"/>',
    },
    {
        id: "R-tonsil",
        view: "head",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" id="R-tonsil" cx="347.84473" cy="294.72556" rx="9.8529997" ry="4.283802"/>',
    },
    {
        id: "L-lymph-nodes",
        view: "head",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" id="L-lymph-nodes" cx="128.51405" cy="293.44043" rx="7.2824631" ry="13.708166"/>',
    },
    {
        id: "R-lymph-nodes",
        view: "head",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" id="R-lymph-nodes" cx="311.86078" cy="296.01071" rx="7.2824631" ry="13.708166"/>',
    },
    {
        id: "L-scm-muscle",
        view: "head",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" d="m 118.66131,275.02008 6.4257,3.85542 -23.98929,39.41098 -13.708162,0.42838 z" id="L-scm-muscle"/>',
    },
    {
        id: "R-scm-muscle",
        view: "head",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000" d="m 340.13387,319.14324 -25.70281,-41.98126 10.7095,2.1419 L 349.98661,320 Z" id="R-scm-muscle"/>',
    },

    // --- VIEW: FRONT BODY (Head-to-Toe) ---
    // 1. Head/Neck (Front View)
    {
        id: "forehead",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="forehead" cx="93.258362" cy="48.29451" rx="10.547077" ry="4.8572063"/>',
    },
    {
        id: "occipital",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="occipital" cx="267.50345" cy="53.579193" rx="12.953212" ry="9.6167784"/>',
    },
    {
        id: "cervical-spine",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="cervical-spine" cx="267.84024" cy="87.984825" rx="0.97144109" ry="8.6041946"/>',
    },
    {
        id: "L-medulla",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-medulla" cx="260.43808" cy="74.480965" rx="6.6728663" ry="2.8457813"/>',
    },
    {
        id: "R-medulla",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-medulla" cx="275.15762" cy="74.579094" rx="6.6729999" ry="2.8457813"/>',
    },
    {
        id: "L-posterior-neck",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-posterior-neck" cx="260.7626" cy="86.180717" rx="2.6370001" ry="6.9388666"/>',
    },
    {
        id: "R-posterior-cervical",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-posterior-cervical" cx="274.77911" cy="86.458275" rx="2.6367691" ry="6.9388666"/>',
    },

    // 2. Torso Upper (Clavicles/Shoulders/Chest)
    {
        id: "L-clavicle",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-clavicle" cx="108.9402" cy="100.05846" rx="8.1879997" ry="3.1918786"/>',
    },
    {
        id: "R-clavicle",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-clavicle" cx="77.576523" cy="100.19724" rx="8.1879997" ry="3.1918786"/>',
    },
    {
        id: "sternum",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="sternum" cx="93.258362" cy="135.72423" rx="4.8569999" ry="11.796073"/>',
    },
    {
        id: "L-upper-chest",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-upper-chest" cx="112.08674" cy="115.5976" rx="11.919" ry="7.4579096"/>',
    },
    {
        id: "R-upper-chest",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-upper-chest" cx="72.812752" cy="115.5976" rx="11.919" ry="7.4579096"/>',
    },
    {
        id: "L-breast",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-breast" cx="114.22588" cy="139.90773" rx="10.206" ry="14.915819"/>',
    },
    {
        id: "R-breast",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-breast" cx="72.176346" cy="140.18529" rx="10.206" ry="14.915819"/>',
    },

    // 3. Upper Extremities
    {
        id: "L-front-deltoid",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-front-deltoid" cx="133.0719" cy="113.17513" rx="5.1030002" ry="5.2990413"/>',
    },
    {
        id: "R-front-deltoid",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-front-deltoid" cx="52.303497" cy="112.0649" rx="5.1030002" ry="5.2990413"/>',
    },
    {
        id: "L-bicep",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-bicep" cx="135.6162" cy="141.89655" rx="4.5139999" ry="19.233557"/>',
    },
    {
        id: "R-bicep",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-bicep" cx="49.653976" cy="141.89655" rx="4.5139999" ry="19.233557"/>',
    },
    {
        id: "L-elbow",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-elbow" cx="137.77507" cy="169.56932" rx="6.6729999" ry="3.9252155"/>',
    },
    {
        id: "R-elbow",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-elbow" cx="48.672672" cy="169.76558" rx="6.6729999" ry="3.9252155"/>',
    },
    {
        id: "L-forearm",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-forearm" cx="144.44794" cy="190.1767" rx="7.2620001" ry="11.579386"/>',
    },
    {
        id: "R-forearm",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-forearm" cx="41.999809" cy="191.55052" rx="7.2620001" ry="11.579386"/>',
    },
    {
        id: "L-wrist",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-wrist" cx="152.10211" cy="211.76538" rx="6.0840001" ry="2.5513902"/>',
    },
    {
        id: "R-wrist",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-wrist" cx="34.345638" cy="213.13921" rx="6.0840001" ry="2.5513902"/>',
    },
    {
        id: "L-palm",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-palm" cx="157.20488" cy="228.44756" rx="8.243" ry="6.084084"/>',
    },
    {
        id: "R-palm",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-palm" cx="29.439117" cy="229.82138" rx="8.243" ry="6.084084"/>',
    },
    {
        id: "L-fingers",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-fingers" cx="160.34506" cy="240.22319" rx="8.0469999" ry="3.1401725"/>',
    },
    {
        id: "R-fingers",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-fingers" cx="26.887726" cy="241.00824" rx="8.0469999" ry="3.1401725"/>',
    },

    // 4. Posterior Torso (Shoulders/Spine/Ribs) - Placed in "Front" view as requested
    {
        id: "L-shoulder",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-shoulder" cx="254.35397" cy="100.87804" rx="7.3597794" ry="4.2196069"/>',
    },
    {
        id: "R-shoulder",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-shoulder" cx="282.02673" cy="101.36869" rx="7.3597794" ry="4.2196069"/>',
    },
    {
        id: "L-outer-shoulder",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-outer-shoulder" cx="235.7092" cy="104.99952" rx="6.1822147" ry="2.5513902"/>',
    },
    {
        id: "R-outer-shoulder",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-outer-shoulder" cx="300.02032" cy="105.25326" rx="6.1820002" ry="2.5513902"/>',
    },
    {
        id: "L-rear-deltoid",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-rear-deltoid" cx="225.92949" cy="117.68317" rx="3.608" ry="6.6613116"/>',
    },
    {
        id: "R-rear-deltoid",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-rear-deltoid" cx="309.47345" cy="117.40562" rx="3.608" ry="6.6613116"/>',
    },
    {
        id: "L-between-shoulder",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-between-shoulder" cx="261.60867" cy="123.93868" rx="2.0799999" ry="15.700862"/>',
    },
    {
        id: "R-between-shoulder",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-between-shoulder" cx="273.29315" cy="123.84055" rx="2.2192407" ry="15.700862"/>',
    },
    {
        id: "L-inner-scapula",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-inner-scapula" cx="249.79919" cy="124.34448" rx="5.829" ry="14.432842"/>',
    },
    {
        id: "R-inner-scapula",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-inner-scapula" cx="286.71396" cy="125.4547" rx="5.829" ry="14.432842"/>',
    },
    {
        id: "L-outer-scapula",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-outer-scapula" cx="238.69701" cy="124.62205" rx="2.7755466" ry="12.48996"/>',
    },
    {
        id: "R-outer-scapula",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-outer-scapula" cx="297.5386" cy="125.17715" rx="2.7755466" ry="12.48996"/>',
    },
    {
        id: "thoracic-spine",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="thoracic-spine" cx="267.84024" cy="127.39759" rx="1.388" ry="29.420794"/>',
    },
    {
        id: "L-outer-ribs",
        view: "front",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-width:0.991394;stroke-opacity:1" d="m 117.54398,158.06201 6.38959,1.90784 -3.19479,18.80584 -8.61208,-3.40685 z" id="L-outer-ribs"/>',
    },
    {
        id: "R-outer-ribs",
        view: "front",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-width:0.939271;stroke-opacity:1" d="m 62.798195,159.81899 6.580091,-1.61129 3.290046,17.972 -6.854263,1.85917 z" id="R-outer-ribs"/>',
    },
    {
        id: "L-rear-ribs",
        view: "front",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" d="m 238.84937,175.16275 9.12613,-1.37383 -5.69157,-29.53725 -6.67286,0.98131 z" id="L-rear-ribs"/>',
    },
    {
        id: "R-rear-ribs",
        view: "front",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" d="m 285.7557,174.08331 5.88782,-29.43912 8.04669,1.17757 -5.00465,30.61668 z" id="R-rear-ribs"/>',
    },

    // 5. Mid/Lower Torso (Abdomen/Organs)
    {
        id: "diaphragm-rear",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="diaphragm-rear" cx="267.42392" cy="144.74477" rx="17.763498" ry="1.6653279"/>',
    },
    {
        id: "upper-abdomen",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="upper-abdomen" cx="93.420128" cy="163.68149" rx="6.6729999" ry="12.168168"/>',
    },
    {
        id: "stomach-region",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="stomach-region" cx="93.027611" cy="187.03653" rx="23.159" ry="8.4392138"/>',
    },
    {
        id: "L-pancreas",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-pancreas" cx="255.13902" cy="152.59276" rx="8.0469999" ry="3.4345636"/>',
    },
    {
        id: "R-liver",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-liver" cx="279.47537" cy="153.0834" rx="8.0466919" ry="3.4345636"/>',
    },
    {
        id: "L-behind-kidney",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-behind-kidney" cx="259.45676" cy="166.91978" rx="5.1030002" ry="7.1635184"/>',
    },
    {
        id: "R-behind-kidney",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-behind-kidney" cx="276.43332" cy="167.11604" rx="5.1030002" ry="7.1635184"/>',
    },
    {
        id: "L-side-kidney",
        view: "front",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" d="m 251.32574,177.63498 -7.3552,2.22044 -1.11022,10.68585 7.63276,-0.13878 z" id="L-side-kidney"/>',
    },
    {
        id: "R-side-kidney",
        view: "front",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" d="m 285.04863,178.32887 0.41633,12.2124 7.49398,-0.55511 -3.0531,-11.24096 z" id="R-side-kidney"/>',
    },
    {
        id: "lumbar-spine",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="lumbar-spine" cx="267.89597" cy="174.47583" rx="1.5700862" ry="13.541994"/>',
    },
    {
        id: "L-below-kidney",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-below-kidney" cx="258.86798" cy="184.28888" rx="5.2010002" ry="7.850431"/>',
    },
    {
        id: "R-below-kidney",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-below-kidney" cx="277.02209" cy="184.58327" rx="5.2009106" ry="7.850431"/>',
    },

    // 6. Pelvis & Hips
    {
        id: "pubic-lower-abdomen",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="pubic-lower-abdomen" cx="93.223877" cy="205.87756" rx="13.542" ry="7.8504314"/>',
    },
    {
        id: "sacral-spine",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="sacral-spine" cx="267.56271" cy="196.64746" rx="1.527" ry="7.0776439"/>',
    },
    {
        id: "L-ilium",
        view: "front",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" d="m 265.34457,203.91495 -6.4766,-10.0093 -19.52795,-2.15887 -1.47195,2.55139 19.23355,2.06074 5.98596,8.14482 z" id="L-ilium"/>',
    },
    {
        id: "R-ilium",
        view: "front",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" d="m 271.33053,204.69999 6.28034,-10.10743 18.05599,-2.45326 1.66822,1.96261 -18.05599,2.74765 -5.78969,8.24295 z" id="R-ilium"/>',
    },
    {
        id: "L-hip-glute",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-hip-glute" cx="248.76054" cy="202.34488" rx="8.6354742" ry="5.1027803"/>',
    },
    {
        id: "R-hip-glute",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-hip-glute" cx="287.42392" cy="202.83553" rx="8.6354742" ry="5.1027803"/>',
    },
    {
        id: "L-outer-hip",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-outer-hip" cx="122.95672" cy="225.9295" rx="3.747" ry="17.069611"/>',
    },
    {
        id: "R-outer-hip",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-outer-hip" cx="63.421242" cy="225.51317" rx="3.747" ry="17.069611"/>',
    },
    {
        id: "coccyx",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="coccyx" cx="267.60156" cy="214.12051" rx="1.4719559" ry="7.1635184"/>',
    },
    {
        id: "L-tailbone",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-tailbone" cx="262.30252" cy="214.4149" rx="1.7663469" ry="5.7896929"/>',
    },
    {
        id: "R-tailbone",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-tailbone" cx="272.70438" cy="214.12051" rx="1.8644774" ry="5.7896929"/>',
    },
    {
        id: "L-inner-groin",
        view: "front",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" d="m 121.48542,198.61591 4.12148,3.14017 -24.92512,32.38303 -5.10278,-2.94391 z" id="L-inner-groin"/>',
    },
    {
        id: "R-inner-groin",
        view: "front",
        svgCode:
            '<path xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" d="m 63.588493,195.08322 -3.140173,4.71025 25.710162,35.13068 4.513998,-4.12147 z" id="R-inner-groin"/>',
    },

    // 7. Lower Extremities
    {
        id: "L-outer-thigh",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-outer-thigh" cx="121.17233" cy="263.67688" rx="4.789" ry="18.76692"/>',
    },
    {
        id: "R-outer-thigh",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-outer-thigh" cx="66.023056" cy="262.89185" rx="4.789" ry="18.76692"/>',
    },
    {
        id: "L-thigh-rear",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-thigh-rear" cx="239.24188" cy="258.47546" rx="3.9252155" ry="11.579386"/>',
    },
    {
        id: "R-thigh-rear",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-thigh-rear" cx="295.56873" cy="258.86798" rx="3.9252155" ry="11.579386"/>',
    },
    {
        id: "L-knee-cap",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-knee-cap" cx="108.80142" cy="298.6488" rx="8.0489998" ry="6.2449799"/>',
    },
    {
        id: "R-knee-cap",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-knee-cap" cx="77.85408" cy="298.51004" rx="8.0489998" ry="6.2449799"/>',
    },
    {
        id: "L-knee-rear",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-knee-rear" cx="253.68495" cy="302.25702" rx="7.355" ry="6.1062026"/>',
    },
    {
        id: "R-knee-rear",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-knee-rear" cx="281.85675" cy="301.7019" rx="7.355" ry="6.1062026"/>',
    },
    // {
    //     id: "L-below-knee",
    //     view: "front",
    //     svgCode:
    //         '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-below-knee" cx="108.10754" cy="311.55511" rx="7.2160001" ry="4.1633201"/>',
    // },
    // {
    //     id: "R-below-knee",
    //     view: "front",
    //     svgCode:
    //         '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-below-knee" cx="78.409187" cy="311.55511" rx="7.2160001" ry="4.1633201"/>',
    // },
    {
        id: "L-calf-front",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-calf-front" cx="107.27487" cy="338.89423" rx="5.967" ry="20.816599"/>',
    },
    {
        id: "R-calf-front",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-calf-front" cx="80.074516" cy="339.7269" rx="5.967" ry="20.816599"/>',
    },
    {
        id: "L-calf-rear",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-calf-rear" cx="256.8869" cy="337.25272" rx="5.4120002" ry="14.432842"/>',
    },
    {
        id: "R-calf-rear",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-calf-rear" cx="279.35876" cy="337.64523" rx="5.4120002" ry="14.432842"/>',
    },
    {
        id: "L-ankle-front",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-ankle-front" cx="104.77689" cy="371.5069" rx="7.0780001" ry="4.0245423"/>',
    },
    {
        id: "R-ankle-front",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-ankle-front" cx="81.739861" cy="371.78445" rx="7.0780001" ry="4.0245423"/>',
    },
    {
        id: "L-ankle-rear",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-ankle-rear" cx="258.54218" cy="378.51517" rx="3.816" ry="6.0368137"/>',
    },
    {
        id: "R-ankle-rear",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-ankle-rear" cx="276.99954" cy="378.51517" rx="3.816" ry="6.0368137"/>',
    },

    // 8. Feet
    {
        id: "L-foot",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-foot" cx="112.68719" cy="384.27441" rx="9.1590004" ry="3.4694333"/>',
    },
    {
        id: "R-foot",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-foot" cx="74.245865" cy="383.85809" rx="9.1590004" ry="3.4694333"/>',
    },
    {
        id: "L-foot-sole",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-foot-sole" cx="231.75813" cy="389.96426" rx="6.1062026" ry="2.3592145"/>',
    },
    {
        id: "R-foot-sole",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-foot-sole" cx="303.50601" cy="389.68674" rx="6.1062026" ry="2.3592145"/>',
    },
    {
        id: "L-heel",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-heel" cx="259.09729" cy="394.12762" rx="4.8572063" ry="3.8857651"/>',
    },
    {
        id: "R-heel",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-heel" cx="275.61179" cy="394.26639" rx="4.8572063" ry="3.8857651"/>',
    },
    {
        id: "L-toes-top",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="L-toes-top" cx="128.5078" cy="391.62961" rx="4.5799999" ry="6.3837571"/>',
    },
    {
        id: "R-toes-top",
        view: "front",
        svgCode:
            '<ellipse xmlns="http://www.w3.org/2000/svg" style="fill:#ffffff;fill-opacity:0;stroke:#000000;stroke-opacity:1" id="R-toes-top" cx="58.286469" cy="391.49081" rx="4.5799999" ry="6.3837571"/>',
    },
];
