const PADDING = 8;
export const DEFAULT_ICON_SIZE = 24;

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

function calculateAngle(originX, originY, x, y) {
    // Calculate the differences in coordinates
    const deltaX = x - originX;
    const deltaY = y - originY;

    // Compute the angle using atan2
    const angle = Math.atan2(deltaY, deltaX);

    return angle;
}

function rotatePoint(x, y, originX, originY, angleRadians) {
    // Translate the point to the origin
    const xTranslated = x - originX;
    const yTranslated = y - originY;

    // Perform the rotation
    const xRotated = xTranslated * Math.cos(angleRadians) - yTranslated * Math.sin(angleRadians);
    const yRotated = xTranslated * Math.sin(angleRadians) + yTranslated * Math.cos(angleRadians);

    // Translate the point back to the original position
    const xNew = xRotated + originX;
    const yNew = yRotated + originY;

    return { x: xNew, y: yNew };
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

        ctx.drawImage(this.image, x, y, drawWidth, drawHeight)
    }

    checkPointCollision(x, y) {
        return {
            isColliding: x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height,
            offsetX: x - this.x,
            offsetY: y - this.y,
        }
    }
}

export class RadiusItem {
    constructor(x, y, width, height, radius, imgSrc, layerDraw, iconColor, radiusColor, fill = false) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.radius = radius
        this.layerDraw = layerDraw
        this.iconColor = iconColor
        this.radiusColor = radiusColor
        this.fill = fill

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
        const centerX = this.x + (this.width / 2)
        const centerY = this.y + (this.height / 2)
        ctx.beginPath()
        ctx.arc(centerX, centerY, this.radius, 0, Math.PI * 2, false)
        if (!this.fill) {
            ctx.strokeStyle = this.radiusColor
            ctx.lineWidth = 3
            ctx.stroke()
        } else {
            ctx.fillStyle = this.radiusColor
            ctx.fill()
        }
        ctx.closePath()
        drawRoundedRect(ctx, this.x, this.y, this.width, this.height, 4, this.iconColor)

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

        ctx.drawImage(this.image, x, y, drawWidth, drawHeight)
    }

    checkPointCollision(x, y) {
        return {
            isColliding: x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height,
            offsetX: x - this.x,
            offsetY: y - this.y,
        }
    }
}

export class DirectionalRectItem {
    constructor(x, y, width, height, directionWidth, directionLength, imgSrc, layerDraw, iconColor, directionColor) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.directionLength = directionLength
        this.directionWidth = directionWidth
        this.layerDraw = layerDraw
        this.iconColor = iconColor
        this.directionColor = directionColor
        this.rotation = 0
        this.grabColor = '#963939'
        this.grabRadius = 6

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
        const centerX = this.x + (this.width / 2)
        const centerY = this.y + (this.height / 2)
        ctx.save()
        ctx.translate(centerX, centerY);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.directionColor
        ctx.fillRect(-this.directionWidth / 2, 0, this.directionWidth, this.directionLength);
        ctx.fillStyle = this.grabColor
        ctx.restore()

        const grabPos = rotatePoint(centerX, centerY + this.directionLength + this.grabRadius * 2, centerX, centerY, this.rotation)
        ctx.beginPath()
        ctx.arc(grabPos.x, grabPos.y, this.grabRadius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.grabColor
        ctx.fill()
        ctx.closePath()

        drawRoundedRect(ctx, this.x, this.y, this.width, this.height, 4, this.iconColor)

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

        ctx.drawImage(this.image, x, y, drawWidth, drawHeight)
    }

    checkPointCollision(x, y) {
        return {
            isColliding: x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height,
            offsetX: x - this.x,
            offsetY: y - this.y,
        }
    }

    checkGrabCollision(x, y) {
        const centerX = this.x + (this.width / 2)
        const centerY = this.y + (this.height / 2)

        const grabPos = rotatePoint(centerX, centerY + this.directionLength + this.grabRadius * 2, centerX, centerY, this.rotation)

        return (x - grabPos.x) * (x - grabPos.x) + (y - grabPos.y) * (y - grabPos.y) <= this.grabRadius * this.grabRadius
    }

    rotateTowards(x, y) {
        console.log(`Going to face: ${x}, ${y}`)
        const centerX = this.x + (this.width / 2)
        const centerY = this.y + (this.height / 2)

        const rotation = calculateAngle(x, y, centerX, centerY)

        this.rotation = rotation + Math.PI / 2
        this.layerDraw()
    }
}

export class DirectionalItem {
    constructor(x, y, width, height, imgSrc, layerDraw, iconColor) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.layerDraw = layerDraw
        this.iconColor = iconColor
        this.rotation = 0
        this.grabColor = '#963939'
        this.grabRadius = 6

        this.image = new Image()
        this.image.src = imgSrc
        this.image.onload = layerDraw

        this.directionWidth = 14
        this.directionLength = 64

        this.arrow = new Image()
        this.arrow.src = './assets/miscellaneous/arrow.png'
        this.arrow.onload = layerDraw
    }

    moveTo(x, y) {
        console.log(x, y)
        this.x = x
        this.y = y
        this.layerDraw()
    }

    draw(ctx) {
        const centerX = this.x + (this.width / 2)
        const centerY = this.y + (this.height / 2)
        ctx.save()
        ctx.translate(centerX, centerY);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.arrow, -this.directionWidth / 2, 0, this.directionWidth, this.directionLength);
        console.log('Drew the arrow')
        ctx.restore()
        
        const grabPos = rotatePoint(centerX, centerY + this.directionLength + this.grabRadius * 2, centerX, centerY, this.rotation)
        ctx.beginPath()
        ctx.arc(grabPos.x, grabPos.y, this.grabRadius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.grabColor
        ctx.fill()
        ctx.closePath()

        drawRoundedRect(ctx, this.x, this.y, this.width, this.height, 4, this.iconColor)

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

        ctx.drawImage(this.image, x, y, drawWidth, drawHeight)
    }

    checkPointCollision(x, y) {
        return {
            isColliding: x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height,
            offsetX: x - this.x,
            offsetY: y - this.y,
        }
    }

    checkGrabCollision(x, y) {
        const centerX = this.x + (this.width / 2)
        const centerY = this.y + (this.height / 2)

        const grabPos = rotatePoint(centerX, centerY + this.directionLength + this.grabRadius * 2, centerX, centerY, this.rotation)

        return (x - grabPos.x) * (x - grabPos.x) + (y - grabPos.y) * (y - grabPos.y) <= this.grabRadius * this.grabRadius
    }

    rotateTowards(x, y) {
        console.log(`Going to face: ${x}, ${y}`)
        const centerX = this.x + (this.width / 2)
        const centerY = this.y + (this.height / 2)

        const rotation = calculateAngle(x, y, centerX, centerY)

        this.rotation = rotation + Math.PI / 2
        this.layerDraw()
    }
}

export class DirectionalArcItem {
    constructor(x, y, width, height, directionRadius, directionAngle, imgSrc, layerDraw, iconColor, directionColor) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.directionRadius = directionRadius
        this.directionAngle = directionAngle
        this.layerDraw = layerDraw
        this.iconColor = iconColor
        this.directionColor = directionColor
        this.rotation = 0
        this.grabColor = '#963939'
        this.grabRadius = 6

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
        const centerX = this.x + (this.width / 2)
        const centerY = this.y + (this.height / 2)
        const startAngle = (Math.PI - this.directionAngle) / 2

        const p1 = rotatePoint(0, this.directionRadius, 0, 0, - this.directionAngle / 2)
        const p2 = rotatePoint(0, this.directionRadius, 0, 0, this.directionAngle / 2)

        ctx.save()
        ctx.translate(centerX, centerY);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.directionColor
        
        // Arc
        ctx.beginPath()
        ctx.arc(0, 0, this.directionRadius, startAngle, startAngle + this.directionAngle, false)
        ctx.fill()
        ctx.closePath()

        // Triangle
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
        
        // ctx.save()
        // ctx.translate(centerX, centerY);
        // ctx.beginPath()
        // ctx.fillStyle = this.directionColor
        // ctx.moveTo(0, 0)
        // ctx.rotate(this.rotation);
        // ctx.lineTo(0, this.directionRadius)
        // ctx.rotate(this.rotation + this.directionAngle);
        // ctx.lineTo(0, this.directionRadius)
        // ctx.lineTo(0, 0)
        // ctx.fill()
        // ctx.closePath()
        // ctx.restore()

        const grabPos = rotatePoint(centerX, centerY + this.directionRadius + this.grabRadius * 2, centerX, centerY, this.rotation)
        ctx.beginPath()
        ctx.arc(grabPos.x, grabPos.y, this.grabRadius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.grabColor
        ctx.fill()
        ctx.closePath()

        drawRoundedRect(ctx, this.x, this.y, this.width, this.height, 4, this.iconColor)

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

        ctx.drawImage(this.image, x, y, drawWidth, drawHeight)
    }

    checkPointCollision(x, y) {
        return {
            isColliding: x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height,
            offsetX: x - this.x,
            offsetY: y - this.y,
        }
    }

    checkGrabCollision(x, y) {
        const centerX = this.x + (this.width / 2)
        const centerY = this.y + (this.height / 2)

        const grabPos = rotatePoint(centerX, centerY + this.directionRadius + this.grabRadius * 2, centerX, centerY, this.rotation)

        return (x - grabPos.x) * (x - grabPos.x) + (y - grabPos.y) * (y - grabPos.y) <= this.grabRadius * this.grabRadius
    }

    rotateTowards(x, y) {
        console.log(`Going to face: ${x}, ${y}`)
        const centerX = this.x + (this.width / 2)
        const centerY = this.y + (this.height / 2)

        const rotation = calculateAngle(x, y, centerX, centerY)

        this.rotation = rotation + Math.PI / 2
        this.layerDraw()
    }
}