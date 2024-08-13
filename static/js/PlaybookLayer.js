import { AbilityFactory } from "./Abilities.js";

export class PlaybookLayer {
    constructor() {
        this.canvas = document.getElementById('playbook-layer')
        this.ctx = this.canvas.getContext('2d')

        this.mouseX = 0
        this.mouseY = 0
        this.items = []
        this.selectedItemIndex = -1
        this.collisionOffsetX = 0
        this.collisionOffsetY = 0

        this.resize()
    }

    onMouseDown(e) {
        console.log('mousedown')
        this.checkCollision()
    }

    onMouseUp(e) {
        console.log('reset selected item')
        this.selectedItemIndex = -1
        this.collisionOffsetX = 0
        this.collisionOffsetY = 0
    }

    onMouseMove(e) {
        console.log('mouseup')
        this.mouseX = e.offsetX
        this.mouseY = e.offsetY

        if (this.selectedItemIndex !== -1) {
            console.log(this.items[this.selectedItemIndex])
            this.items[this.selectedItemIndex].moveTo(this.mouseX - this.collisionOffsetX, this.mouseY - this.collisionOffsetY)
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.draw()
    }

    addAbility(name) {
        this.items.push(AbilityFactory.makeAbility(name, () => this.draw()))
        console.log(this.items)
    }

    checkCollision() {
        console.log("checked collisions")

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i]
            
            const collisionResult = item.checkPointCollision(this.mouseX, this.mouseY)
            if (collisionResult.isColliding) {
                console.log('Got a hit')
                this.selectedItemIndex = i
                this.collisionOffsetX = collisionResult.offsetX
                this.collisionOffsetY = collisionResult.offsetY
            }
        }
    }

    draw() {
        console.log('draw called')
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.items.forEach((ability) => ability.draw(this.ctx))
    }
}