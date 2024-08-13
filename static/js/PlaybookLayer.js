import { AbilityFactory } from "./Abilities.js";

export class PlaybookLayer {
    constructor() {
        this.canvas = document.getElementById('draw-layer')
        this.ctx = this.canvas.getContext('2d')

        this.items = {
            abilities: [],
            sponsors: [],
            misc: [],
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addAbility(name) {
        this.items.abilities.push(AbilityFactory.makeAbility(name, () => this.draw()))
    }

    draw() {
        this.items.abilities.forEach((ability) => ability.draw(this.ctx))
    }
}