import { ABILITY } from "./Abilities.js";
import { BaseLayer } from "./BaseLayer.js";
import { DrawLayer } from "./DrawLayer.js";
import { PlaybookLayer } from "./PlaybookLayer.js";

export class App {
    constructor() {
        this.baseLayer = new BaseLayer();
        this.drawLayer = new DrawLayer();
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
        })

        // Map Dropdown
        const dropdown = document.getElementById('maps-dropdown');
        dropdown.addEventListener('change', () => {
            this.baseLayer.setCurrentMap(dropdown.value)
            this.baseLayer.resize()
            this.drawLayer.resize()
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
        };

        eraserBtn.onclick = () => {
            this.setEditState("ERASE");
            setActiveButton(eraserBtn);
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
        document.addEventListener('keydown', (event) => {
            // Check for zoom key combinations: Ctrl + (plus or minus) or Ctrl + scroll
            if (event.ctrlKey && (event.key === '=' || event.key === '-' || event.key === '0' || event.key === '+' || event.key === '_')) {
                event.preventDefault(); // Prevent the default zoom action
            }
        });

        document.addEventListener('wheel', (event) => {
            if (event.ctrlKey) {
                event.preventDefault(); // Prevent zooming via mouse scroll
            }
        }, { passive: false }); // { passive: false } is needed to prevent default action

        // Placable container
        document.addEventListener('DOMContentLoaded', () => {
            const optionsDropdown = document.getElementById('options-dropdown');
            const sponsorsContainer = document.getElementById('sponsors-container');
            const abilitiesContainer = document.getElementById('abilities-container');

            optionsDropdown.addEventListener('change', (event) => {
                const selectedValue = event.target.value;

                // Hide all containers
                sponsorsContainer.classList.add('hidden');
                abilitiesContainer.classList.add('hidden');

                // Show the appropriate container based on the selection
                if (selectedValue === 'sponsors') {
                    sponsorsContainer.classList.remove('hidden');
                } else if (selectedValue === 'abilities') {
                    abilitiesContainer.classList.remove('hidden');
                }
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
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

        this.initializeAbilitiesButtons()
    }

    initializeAbilitiesButtons() {
        const splinterGrenade = document.getElementById("Splinter Grenade");
        const adrenalink = document.getElementById("Adrena-link");
        const flashGrenade = document.getElementById("Flash Grenade");

        const hiddenGrasp = document.getElementById("Hidden Grasp");
        console.log(hiddenGrasp)
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

        splinterGrenade.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.SPLINTER_GRENADE);
        };
        adrenalink.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.ADRENALINK);
        };
        flashGrenade.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.FLASH_GRENADE);
        };

        hiddenGrasp.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.HIDDEN_GRASP);
        };
        meltdown.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.MELTDOWN);
        };
        smokeShift.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.SMOKE_SHIFT);
        };

        hexBarrier.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.HEX_BARRIER);
        };
        swarmGrenade.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.SWARM_GRENADE);
        };
        twinMend.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.TWIN_MEND);
        };

        arcSentry.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.ARC_SENTRY);
        };
        hullMine.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.HULL_MINE);
        };
        waveScan.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.WAVE_SCAN);
        };

        dualAmp.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.DUAL_AMP);
        };
        nanoSphere.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.NANO_SPHERE);
        };
        vectorWall.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.VECTOR_WALL);
        };

        deadZone.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.DEAD_ZONE);
        };
        dupe.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.DUPE);
        };
        partition.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.PARTITION);
        };

        dazzler.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.DAZZLER);
        };
        hyperDome.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.HYPER_DOME);
        };
        patches.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.PATCHES);
        };

        glareBurst.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.GLARE_BURST);
        };
        pulsefinder.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.PULSEFINDER);
        };
        reconWing.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.RECON_WING);
        };
    }
}

const EDIT_STATE = {
    NONE: "NONE",
    DRAW: "DRAW",
    ERASE: "ERASE",
}