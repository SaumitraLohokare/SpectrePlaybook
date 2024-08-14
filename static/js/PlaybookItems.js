const PADDING = 8;
export const DEFAULT_ICON_SIZE = 32;

function drawRoundedRect(context, x, y, width, height, radius, color) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 2 * Math.PI);
    context.lineTo(x + width, y + height - radius);
    context.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI);
    context.lineTo(x + radius, y + height);
    context.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI);
    context.lineTo(x, y + radius);
    context.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI);
    context.closePath();

    // Fill or stroke the path
    context.fillStyle = color; // Change color as needed
    context.fill();
}

export class IconItem {
    constructor(x, y, width, height, imgSrc, layerDraw, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.layerDraw = layerDraw
        this.color = color

        this.image = new Image()
        this.image.src = imgSrc
        this.image.onload = layerDraw
    }

    moveTo(x, y) {
        console.log(x, y)
        this.x = x
        this.y = y
        this.layerDraw()
    }

    draw(ctx) {
        drawRoundedRect(ctx, this.x, this.y, this.width, this.height, 4, this.color)

        const imgWidth = this.image.width
        const imgHeight = this.image.height
        const aspectRatio = imgWidth / imgHeight
        let drawWidth = 0
        let drawHeight = 0
        if (imgWidth > imgHeight) {
            drawWidth = this.width - PADDING
            drawHeight = drawWidth / aspectRatio
        } else {
            drawHeight = this.height - PADDING
            drawWidth = drawHeight * aspectRatio
        }        
        let x = this.x + (this.width - drawWidth) / 2
        let y = this.y + (this.height - drawHeight) / 2
        
        ctx.drawImage(this.image, x, y, drawWidth , drawHeight)
    }

    checkPointCollision(x, y) {
        return {
            isColliding: x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height,
            offsetX: x - this.x,
            offsetY: y - this.y,
        }
    }
}

// TODO: Add RadiusItem
// TODO: Add DirectionalItem
// TODO: Add LineItem