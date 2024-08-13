export class DrawLayer {
    constructor() {
        this.canvas = document.getElementById('draw-layer')
        this.ctx = this.canvas.getContext('2d')

        this.editState = EDIT_STATE.NONE
        this.isDrawing = false

        this.resize()

        this.canvas.addEventListener('mousedown', (e) => {
            if (this.editState === EDIT_STATE.DRAW || this.editState === EDIT_STATE.ERASE) {
                this.isDrawing = true;
                this.ctx.beginPath();
                this.ctx.moveTo(e.offsetX, e.offsetY);
                e.stopPropagation();
            }
        });
        
        this.canvas.addEventListener('mouseup', () => {
            if (this.editState === EDIT_STATE.DRAW || this.editState === EDIT_STATE.ERASE) {
                this.isDrawing = false;
                this.ctx.closePath();
                e.stopPropagation();
            }
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.editState === EDIT_STATE.DRAW || this.editState === EDIT_STATE.ERASE) {
                if (this.isDrawing) {
                    this.ctx.lineTo(e.offsetX, e.offsetY);
                    this.ctx.stroke();
                    e.stopPropagation();
                }
            }
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setEditState(state) {
        switch (state) {
            case "NONE":
                this.editState = EDIT_STATE.NONE
                break;
            case "DRAW":
                this.editState = EDIT_STATE.DRAW
                this.ctx.globalCompositeOperation = 'source-over';
                break;
            case "ERASE":
                this.editState = EDIT_STATE.ERASE
                this.ctx.globalCompositeOperation = 'destination-out'; // Erase mode
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

    setDrawColor(color) {
        this.ctx.strokeStyle = color;
    }

    setLineWidth(size) {
        this.ctx.lineWidth = size;
    }
}

const EDIT_STATE = {
    NONE: "NONE",
    DRAW: "DRAW",
    ERASE: "ERASE",
}