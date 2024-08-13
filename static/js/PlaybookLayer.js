export class PlaybookLayer {
    constructor() {
        this.canvas = document.getElementById('draw-layer')
        this.ctx = this.canvas.getContext('2d')
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}