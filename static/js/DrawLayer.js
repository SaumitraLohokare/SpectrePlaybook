import { AbilityFactory } from "./Abilities.js";

export class DrawLayer {
    constructor() {
        this.canvas = document.getElementById('draw-layer')
        this.ctx = this.canvas.getContext('2d')

        this.isDrawing = false

        this.drawColor = "";
        this.lineWidth = 1;

        this.resize()
    }

    onMouseDown(e) {
        this.isDrawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.offsetX, e.offsetY);
    }

    onMouseUp(e) {
        this.isDrawing = false;
        this.ctx.closePath();
    }

    onMouseMove(e) {
        if (this.isDrawing) {
            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();
        }
    }

    resize() {
        const pixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * pixelRatio;
        this.canvas.height = window.innerHeight * pixelRatio;
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;

        this.ctx.scale(pixelRatio, pixelRatio);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.drawColor;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.imageSmoothingEnabled = true;
    }

    setDrawColor(color) {
        this.drawColor = color;
        this.ctx.strokeStyle = color;
    }

    setLineWidth(size) {
        this.lineWidth = size;
        this.ctx.lineWidth = size;
    }

    setGlobalCompositeOperation(operation) {
        this.ctx.globalCompositeOperation = operation;
    }
}