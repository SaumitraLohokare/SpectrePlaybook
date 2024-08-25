export class BaseLayer {
    constructor() {
        this.canvas = document.getElementById('base-layer')
        this.ctx = this.canvas.getContext('2d')

        this.mapSrc = {
            Skyway: './assets/maps/Skyway.png',
            Mill: './assets/maps/Mill.png',
            Metro: './assets/maps/Metro.png',
        }

        this.currentMap = this.mapSrc.Skyway
        this.resize()
    }

    drawMap() {
        // this.ctx.fillStyle = '#292929'
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        const img = new Image();
        console.log(`Setting map to: ${this.currentMap}`);
        img.src = this.currentMap;
        img.onload = () => {
            const availableHeight = this.canvas.height - 60 - 20;
            const aspectRatio = img.width / img.height;
            const desiredHeight = availableHeight;
            const desiredWidth = desiredHeight * aspectRatio;
            const x = (this.canvas.width - desiredWidth) / 2;
            const y = 60;
            this.ctx.drawImage(img, x, y, desiredWidth, desiredHeight);
        };
    }

    resize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.drawMap()
    }

    setCurrentMap(mapName) {
        switch (mapName) {
            case "Skyway":
                this.currentMap = this.mapSrc.Skyway
                break;
            case "Mill":
                this.currentMap = this.mapSrc.Mill
                break;
            case "Metro":
                this.currentMap = this.mapSrc.Metro
                break;
            default:
                console.error(`Trying to set current map name to invalid value: ${mapName}`)
                break;
        }
    }

    getImageData() {
        return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    }
}