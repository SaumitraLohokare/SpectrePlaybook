import { ABILITY } from "./Abilities.js";
import { BaseLayer } from "./BaseLayer.js";
import { DrawLayer } from "./DrawLayer.js";
import { PlaybookLayer } from "./PlaybookLayer.js";

export class App {
    constructor() {
        this.baseLayer = new BaseLayer();
        this.drawLayer = new DrawLayer();
        this.playbookLayer = new PlaybookLayer();
    }
    
    run() {
        this.initializeUI()
    }

    initializeUI() {
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
            this.drawLayer.setEditState("NONE");
            setActiveButton(pointerBtn);
        };

        penBtn.onclick = () => {
            this.drawLayer.setEditState("DRAW");
            setActiveButton(penBtn);
        };

        eraserBtn.onclick = () => {
            this.drawLayer.setEditState("ERASE");
            setActiveButton(eraserBtn);
        };

        textBtn.onclick = () => {
            this.drawLayer.setEditState("COMMENT");
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

        this.initializeAbilitiesButtons()
    }

    initializeAbilitiesButtons() {
        const splinterGrenade = document.getElementById("Splinter Grenade")
        const adrenalink = document.getElementById("Adrena-link")
        const flashGrenade = document.getElementById("Flash Grenade")

        splinterGrenade.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.SPLINTER_GRENADE)
        }
        adrenalink.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.ADRENALINK)
        }
        flashGrenade.onclick = () => {
            this.playbookLayer.addAbility(ABILITY.FLASH_GRENADE)
        }
    }
}