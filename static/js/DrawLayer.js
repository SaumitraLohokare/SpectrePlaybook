import { Path } from "./Path.js";

export class DrawLayer {
    constructor() {
        this.canvas = document.getElementById('draw-layer')
        this.ctx = this.canvas.getContext('2d')

        // 0 - None
        // 1 - Drawing
        // 2 - Erasing
        this.editState = 0 
        
        this.isPressed = false

        this.drawColor = ""
        this.lineWidth = 5


        this.paths = []
        this.pathsData = []
        this.currentPath = null
        this.currentPathPoints = []

        this.resize()
    }

    onMouseDown(e) {
        if (e.button == 0) {
            this.isPressed = true;
    
            if (this.editState === 1) {
                this.currentPath = new Path2D()
                this.currentPath.moveTo(e.offsetX, e.offsetY)
                this.currentPath.lineTo(e.offsetX, e.offsetY)
                this.currentPathPoints = []
                this.currentPathPoints.push([e.offsetX, e.offsetY])
                this.currentPathPoints.push([e.offsetX, e.offsetY])
                
            } else if (this.editState === 2) {
                this.currentPath = new Path2D()
                this.currentPath.moveTo(e.offsetX, e.offsetY)
                this.currentPath.lineTo(e.offsetX, e.offsetY)
                this.currentPathPoints = []
                this.currentPathPoints.push([e.offsetX, e.offsetY])
                this.currentPathPoints.push([e.offsetX, e.offsetY])

                console.log('Mouse Down')
                const { isColliding, pathIndex } = this.checkPathCollision(e.offsetX, e.offsetY)
                if (isColliding) {
                    this.paths.splice(pathIndex, 1)
                    this.draw()
                }

                
                this.ctx.strokeStyle = '#d5d5d514'
                this.ctx.lineWidth = 4
            }
        }
    }
    
    onMouseUp(e) {
        if (this.isPressed) {
            this.isPressed = false
    
            if (this.editState === 1) {
                this.currentPath.lineTo(e.offsetX, e.offsetY)
                this.currentPathPoints.push([e.offsetX, e.offsetY])
                this.pathsData.push(this.currentPathPoints)
                this.paths.push(new Path(this.currentPath, this.currentPathPoints, this.drawColor, this.lineWidth))

                console.log(this.currentPathPoints)
        
                this.draw()
            } else if (this.editState === 2) {
                console.log(this.pathsData)

                const { isColliding, pathIndex } = this.checkPathCollision(e.offsetX, e.offsetY)
                if (isColliding) {
                    this.paths.splice(pathIndex, 1)
                }
                this.draw() // This is outside because we want to clear the eraser stroke
            }
        }
    }
    
    onMouseMove(e) {
        if (this.isPressed) {

            if (this.editState === 1) {
                this.currentPath.lineTo(e.offsetX, e.offsetY)
                this.currentPathPoints.push([e.offsetX, e.offsetY])
    
                this.draw() // To preserve opacity
                this.resetContextDefaults()
                this.ctx.stroke(this.currentPath)
            } else if (this.editState === 2) {
                this.currentPath.lineTo(e.offsetX, e.offsetY)
                this.draw() // To preserve eraser stroke opacity
                this.ctx.strokeStyle = '#d5d5d514'
                this.ctx.lineWidth = 4
                this.ctx.stroke(this.currentPath)

                console.log('Mouse Move')
                const { isColliding, pathIndex } = this.checkPathCollision(e.offsetX, e.offsetY)
                if (isColliding) {
                    console.log(pathIndex)
                    this.paths.splice(pathIndex, 1)
                    this.draw()
                }
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (const path of this.paths) {
            this.ctx.strokeStyle = path.strokeStyle
            this.ctx.lineWidth = path.lineWidth
            this.ctx.stroke(path.path2d)
        }
    }

    checkPathCollision(x, y) {
        for (let i in this.paths) {
            if (this.paths[i].isPointInPath(x, y)) {
                return { isColliding: true, pathIndex: i }
            }
        }
        return { isColliding: false, pathIndex: -1 }
    }

    resize() {
        const pixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * pixelRatio;
        this.canvas.height = window.innerHeight * pixelRatio;

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

    resetContextDefaults() {
        this.ctx.strokeStyle = this.drawColor
        this.ctx.lineWidth = this.lineWidth
    }

    resetState() {
        this.editState = 0 // None
    }

    startDrawing() {
        this.editState = 1 // Drawing
        
        this.resetContextDefaults()
    }

    startErasing() {
        this.editState = 2 // Erasing
    }

    getImageData() {
        return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    }
}