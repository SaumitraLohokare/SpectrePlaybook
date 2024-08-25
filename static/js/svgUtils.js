export function pointsToSvgPath(points) {
    if (!points.length || points.length < 2) throw new Error("Cannot draw SVG path with less than 2 points");
    

    let d = `M${points[0][0]} ${points[0][1]}`
    for (let i = 1; i < points.length; i++) {
        d += ' '

        const rX = points[i][0] - points[i - 1][0]
        const rY = points[i][1] - points[i - 1][1]

        d += `l${rX} ${rY}`
    }

    // d += ' Z'

    return d
}

export class SvgPathBuilder {
    constructor(startX, startY) {
        this.d = `M${startX} ${startY} l0 0`
        this.lastX = startX
        this.lastY = startY
    }

    addPoint(x, y) {
        this.d += ` l${x - this.lastX} ${y - this.lastY}`
        this.lastX = x
        this.lastY = y
    }

    path() {
        return this.d
    }
}