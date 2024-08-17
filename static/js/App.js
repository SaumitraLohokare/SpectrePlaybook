import { ABILITY } from "./Abilities.js";
import { BaseLayer } from "./BaseLayer.js";
import { DrawLayer } from "./DrawLayer.js";
import { PlaybookLayer } from "./PlaybookLayer.js";
import { SPONSOR } from "./Sponsors.js";

export class App {
    constructor() {
        this.baseLayer = new BaseLayer();
        this.drawLayer = new DrawLayer();
        this.playbookLayer = new PlaybookLayer();

        this.editState = EDIT_STATE.NONE
        this.playbookLayer = new PlaybookLayer();

        this.editState = EDIT_STATE.NONE
    }


    run() {
        this.initializeUI()
    }

    setEditState(state) {
        switch (state) {
            case "NONE":
                this.editState = EDIT_STATE.NONE
                break;
            case "DRAW":
                this.editState = EDIT_STATE.DRAW
                this.drawLayer.setGlobalCompositeOperation('source-over')
                break;
            case "ERASE":
                this.editState = EDIT_STATE.ERASE
                this.drawLayer.setGlobalCompositeOperation('destination-out')
                break;
            case "COMMENT":
                this.editState = EDIT_STATE.NONE
                alert("Comments are under development.")
                break;
            default:
                break;
        }
        console.log(`DrawLayer current editState: ${this.editState}`)
    }

    initializeUI() {
        const canvasContainer = document.querySelector('div.canvas-container')
        canvasContainer.addEventListener('mousedown', (e) => {
            if (this.editState === EDIT_STATE.NONE) {
                this.playbookLayer.onMouseDown(e)
            } else if (this.editState === EDIT_STATE.DRAW || this.editState === EDIT_STATE.ERASE) {
                this.drawLayer.onMouseDown(e)
            }
        })
        canvasContainer.addEventListener('mouseup', (e) => {
            if (this.editState === EDIT_STATE.NONE) {
                this.playbookLayer.onMouseUp(e)
            } else if (this.editState === EDIT_STATE.DRAW || this.editState === EDIT_STATE.ERASE) {
                this.drawLayer.onMouseUp(e)
            }
        })
        canvasContainer.addEventListener('mousemove', (e) => {
            if (this.editState === EDIT_STATE.NONE) {
                this.playbookLayer.onMouseMove(e)
            } else if (this.editState === EDIT_STATE.DRAW || this.editState === EDIT_STATE.ERASE) {
                this.drawLayer.onMouseMove(e)
            }
        })

        window.addEventListener('resize', () => {
            this.baseLayer.resize()
            this.drawLayer.resize()
            this.playbookLayer.resize()
            this.playbookLayer.resize()
        })

        // Map Dropdown
        const dropdown = document.getElementById('maps-dropdown');
        dropdown.addEventListener('change', () => {
            this.baseLayer.setCurrentMap(dropdown.value)
            this.baseLayer.resize()
            this.drawLayer.resize()
            this.playbookLayer.resize()
            this.playbookLayer.resize()
        });

        // Toolbar Buttons
        const pointerBtn = document.getElementById('pointer-btn');
        const penBtn = document.getElementById('pen-btn');
        const eraserBtn = document.getElementById('eraser-btn');
        const textBtn = document.getElementById('comment-btn');

        // Function to handle button selection
        function setActiveButton(activeButton) {
            // Remove 'selected' class from all buttons
            [pointerBtn, penBtn, eraserBtn, textBtn].forEach(btn => btn.classList.remove('selected'));

            // Add 'selected' class to the active button
            activeButton.classList.add('selected');
        }

        // Assign click events to buttons
        pointerBtn.onclick = () => {
            this.setEditState("NONE");
            setActiveButton(pointerBtn);
        };

        penBtn.onclick = () => {
            this.setEditState("DRAW");
            setActiveButton(penBtn);
            this.drawLayer.resetContextDefaults()
        };

        eraserBtn.onclick = () => {
            this.setEditState("ERASE");
            setActiveButton(eraserBtn);
            this.drawLayer.resetContextDefaults()
        };

        textBtn.onclick = () => {
            this.setEditState("COMMENT");
            setActiveButton(textBtn);
        };

        // Initialize the first button as selected (optional)
        setActiveButton(pointerBtn); // Set initial state if needed

        const colorPicker = document.querySelector('.color-picker');
        colorPicker.addEventListener('input', (event) => {
            console.log('Color picked:', event.target.value);
            this.drawLayer.setDrawColor(event.target.value);
        });
        this.drawLayer.setDrawColor(colorPicker.value);

        const lineWidthInput = document.querySelector('.line-width-input');
        lineWidthInput.addEventListener('input', (event) => {
            this.drawLayer.setLineWidth(parseFloat(event.target.value))
            console.log(`Set line width to: ${event.target.value}`)
        });
        this.drawLayer.setLineWidth(parseFloat(lineWidthInput.value))

        // Disable zoming
        // Keyboard shortcuts
        // TODO: Might wanna add these to the canvasConatiner instead of document. Incase we implement adding comments to custon sticky notes.
        document.addEventListener('keydown', (event) => {
            // Check for zoom key combinations: Ctrl + (plus or minus) or Ctrl + scroll
            if (event.ctrlKey && (event.key === '=' || event.key === '-' || event.key === '0' || event.key === '+' || event.key === '_')) {
                event.preventDefault(); // Prevent the default zoom action
            }

            switch (event.key) {
                case 's':
                    pointerBtn.click(); // Simulate button click
                    break;
                case 'd':
                    penBtn.click(); // Simulate button click
                    break;
                case 'e':
                    eraserBtn.click(); // Simulate button click
                    break;
            }
        });


        document.addEventListener('wheel', (event) => {
            if (event.ctrlKey) {
                event.preventDefault(); // Prevent zooming via mouse scroll
            }
        }, { passive: false }); // { passive: false } is needed to prevent default action


        // TODO: Maybe eventually move these functions to a UI Utils file and only call it in here
        this.initializeAbilitiesButtons()
        this.initializeSponsorButtons()
        this.initializePlacableTabs()
    }

    initializeAbilitiesButtons() {
        const splinterGrenade = document.getElementById("Splinter Grenade");
        const adrenalink = document.getElementById("Adrena-link");
        const flashGrenade = document.getElementById("Flash Grenade");

        const hiddenGrasp = document.getElementById("Hidden Grasp");
        const meltdown = document.getElementById("Meltdown");
        const smokeShift = document.getElementById("Smoke Shift");

        const hexBarrier = document.getElementById("Hex Barrier");
        const swarmGrenade = document.getElementById("Swarm Grenade");
        const twinMend = document.getElementById("Twin Mend");

        const arcSentry = document.getElementById("Arc Sentry");
        const hullMine = document.getElementById("Hull Mine");
        const waveScan = document.getElementById("Wave Scan");

        const dualAmp = document.getElementById("Dual Amp");
        const nanoSphere = document.getElementById("Nano Sphere");
        const vectorWall = document.getElementById("Vector Wall");

        const deadZone = document.getElementById("Dead Zone");
        const dupe = document.getElementById("Dupe");
        const partition = document.getElementById("Partition");

        const dazzler = document.getElementById("Dazzler");
        const hyperDome = document.getElementById("Hyper Dome");
        const patches = document.getElementById("Patches");

        const glareBurst = document.getElementById("Glare Burst");
        const pulsefinder = document.getElementById("Pulsefinder");
        const reconWing = document.getElementById("Recon Wing");

        splinterGrenade.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.SPLINTER_GRENADE, e.clientX, e.clientY);
        });

        adrenalink.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.ADRENALINK, e.clientX, e.clientY);
        });

        flashGrenade.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.FLASH_GRENADE, e.clientX, e.clientY);
        });

        hiddenGrasp.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.HIDDEN_GRASP, e.clientX, e.clientY);
        });

        meltdown.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.MELTDOWN, e.clientX, e.clientY);
        });

        smokeShift.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.SMOKE_SHIFT, e.clientX, e.clientY);
        });

        hexBarrier.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.HEX_BARRIER, e.clientX, e.clientY);
        });

        swarmGrenade.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.SWARM_GRENADE, e.clientX, e.clientY);
        });

        twinMend.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.TWIN_MEND, e.clientX, e.clientY);
        });

        arcSentry.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.ARC_SENTRY, e.clientX, e.clientY);
        });

        hullMine.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.HULL_MINE, e.clientX, e.clientY);
        });

        waveScan.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.WAVE_SCAN, e.clientX, e.clientY);
        });

        dualAmp.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.DUAL_AMP, e.clientX, e.clientY);
        });

        nanoSphere.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.NANO_SPHERE, e.clientX, e.clientY);
        });

        vectorWall.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.VECTOR_WALL, e.clientX, e.clientY);
        });

        deadZone.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.DEAD_ZONE, e.clientX, e.clientY);
        });

        dupe.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.DUPE, e.clientX, e.clientY);
        });

        partition.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.PARTITION, e.clientX, e.clientY);
        });

        dazzler.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.DAZZLER, e.clientX, e.clientY);
        });

        hyperDome.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.HYPER_DOME, e.clientX, e.clientY);
        });

        patches.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.PATCHES, e.clientX, e.clientY);
        });

        glareBurst.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.GLARE_BURST, e.clientX, e.clientY);
        });

        pulsefinder.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.PULSEFINDER, e.clientX, e.clientY);
        });

        reconWing.addEventListener('mousedown', (e) => {
            this.playbookLayer.addAbilityByDrag(ABILITY.RECON_WING, e.clientX, e.clientY);
        });

    }

    initializeSponsorButtons() {
        const pinnacleInternational = document.getElementById("Pinnacle International");
        const bloomTechnologies = document.getElementById("Bloom Technologies");
        const ghostlinkCollective = document.getElementById("Ghostlink Collective");
        const morrgenUnited = document.getElementById("Morrgen United");
        const muuRobotics = document.getElementById("Muu Robotics");
        const rykerIndustries = document.getElementById("Ryker Industries");
        const umbraReconnaissance = document.getElementById("Umbra Reconnaissance");
        const vectorDynamics = document.getElementById("Vector Dynamics");

        bloomTechnologies.addEventListener('mousedown', (e) => {
            this.playbookLayer.addSponsorByDrag(SPONSOR.BLOOM_TECHNOLOGIES, e.clientX, e.clientY);
        });

        ghostlinkCollective.addEventListener('mousedown', (e) => {
            this.playbookLayer.addSponsorByDrag(SPONSOR.GHOSTLINK_COLLECTIVE, e.clientX, e.clientY);
        });

        morrgenUnited.addEventListener('mousedown', (e) => {
            this.playbookLayer.addSponsorByDrag(SPONSOR.MORRGEN_UNITED, e.clientX, e.clientY);
        });

        muuRobotics.addEventListener('mousedown', (e) => {
            this.playbookLayer.addSponsorByDrag(SPONSOR.MUU_ROBOTICS, e.clientX, e.clientY);
        });

        pinnacleInternational.addEventListener('mousedown', (e) => {
            this.playbookLayer.addSponsorByDrag(SPONSOR.PINNACLE_INTERNATIONAL, e.clientX, e.clientY);
        });

        rykerIndustries.addEventListener('mousedown', (e) => {
            this.playbookLayer.addSponsorByDrag(SPONSOR.RYKER_INDUSTRIES, e.clientX, e.clientY);
        });

        umbraReconnaissance.addEventListener('mousedown', (e) => {
            this.playbookLayer.addSponsorByDrag(SPONSOR.UMBRA_RECONNAISSANCE, e.clientX, e.clientY);
        });

        vectorDynamics.addEventListener('mousedown', (e) => {
            this.playbookLayer.addSponsorByDrag(SPONSOR.VECTOR_DYNAMICS, e.clientX, e.clientY);
        });

    }

    initializePlacableTabs() {
        const sponsorTabButton = document.querySelector("div#sponsor-tab-button")
        const abilityTabButton = document.querySelector("div#ability-tab-button")
        const miscellanousTabButton = document.querySelector("div#miscellaneous-tab-button")

        const sponsorsContainer = document.getElementById('sponsors-container');
        const abilitiesContainer = document.getElementById('abilities-container');
        const miscellaneousContainer = document.getElementById('miscellaneous-container');

        const closeButtonSponsorsContainer = document.getElementById('close-button-sponsors-container')
        const closeButtonAbilitiesContainer = document.getElementById('close-button-abilities-container')
        const closeButtonMiscellaneousContainer = document.getElementById('close-button-miscellaneous-container')

        function hideContainers() {
            sponsorsContainer.classList.add("hidden")
            abilitiesContainer.classList.add("hidden")
            miscellaneousContainer.classList.add("hidden")
        }

        sponsorTabButton.addEventListener('mouseover', () => {
            hideContainers()
            sponsorsContainer.classList.remove("hidden")
        })

        abilityTabButton.addEventListener('mouseover', () => {
            hideContainers()
            abilitiesContainer.classList.remove("hidden")
        })

        miscellanousTabButton.addEventListener('mouseover', () => {
            hideContainers()
            miscellaneousContainer.classList.remove('hidden')
        })

        closeButtonSponsorsContainer.addEventListener('click', () => {
            hideContainers()
        })

        closeButtonAbilitiesContainer.addEventListener("click", () => {
            hideContainers()
        })

        closeButtonMiscellaneousContainer.addEventListener('click', () => {
            hideContainers()
        })
    }
}

const EDIT_STATE = {
    NONE: "NONE",
    DRAW: "DRAW",
    ERASE: "ERASE",
}