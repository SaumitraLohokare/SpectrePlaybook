import { AbilityFactory } from "./Abilities.js";
import { SponsorFactory } from "./Sponsors.js";

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

        this.selectedGrabItemIndex = -1

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
        this.selectedGrabItemIndex = -1
    }

    onMouseMove(e) {
        console.log('mouseup')
        this.mouseX = e.offsetX
        this.mouseY = e.offsetY

        if (this.selectedItemIndex !== -1) {
            this.items[this.selectedItemIndex].moveTo(this.mouseX - this.collisionOffsetX, this.mouseY - this.collisionOffsetY)
        } else if (this.selectedGrabItemIndex !== -1) {
            this.items[this.selectedGrabItemIndex].rotateTowards(this.mouseX, this.mouseY)
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.draw()
    }

    addAbility(name) {
        this.items.push(AbilityFactory.makeAbility(name, () => this.draw()))
    }

    addAbilityByDrag(name, x, y) {
        this.items.push(AbilityFactory.makeAbility(name, () => this.draw()))
        this.selectedItemIndex = this.items.length - 1
        this.items[this.selectedItemIndex].x = x
        this.items[this.selectedItemIndex].y = y
        this.collisionOffsetX = this.items[this.selectedItemIndex].width / 2
        this.collisionOffsetY = this.items[this.selectedItemIndex].height / 2
    }

    addSponsor(name) {
        this.items.push(SponsorFactory.makeSponsor(name, () => this.draw()))
    }

    addSponsorByDrag(name, x, y) {
        this.items.push(SponsorFactory.makeSponsor(name, () => this.draw()))
        this.selectedItemIndex = this.items.length - 1
        this.items[this.selectedItemIndex].x = x
        this.items[this.selectedItemIndex].y = y
        this.collisionOffsetX = this.items[this.selectedItemIndex].width / 2
        this.collisionOffsetY = this.items[this.selectedItemIndex].height / 2
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

            if (item.checkGrabCollision) {
                const collisionResult = item.checkGrabCollision(this.mouseX, this.mouseY)
                if (collisionResult) {
                    console.log('Got a grab hit')
                    this.selectedGrabItemIndex = i
                }
            }
        }
    }

    draw() {
        console.log('draw called')
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.items.forEach((ability) => ability.draw(this.ctx))
    }
}