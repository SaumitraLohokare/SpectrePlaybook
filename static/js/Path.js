export class Path {
    constructor(path2d, points, strokeStyle, lineWidth) {
        this.path2d = path2d
        this.points = points
        this.strokeStyle = strokeStyle
        this.lineWidth = lineWidth
    }

    isPointInPath(x, y) {
        const radius = this.lineWidth / 2

        // this is quite inefficient...
        for (let i = 1; i < this.points.length; i++) {
            if (checkPointCircleCollision(x, y, this.points[i][0], this.points[i][1], radius)) {
                console.log('returning true')
                return true
            }
        }
        return false
    }
}

function checkPointCircleCollision(x, y, circleCenterX, circleCenterY, radius) {
    const lhs = (x - circleCenterX) * (x - circleCenterX) + (y - circleCenterY) * (y - circleCenterY)
    const rhs = radius * radius

    return lhs <= rhs
}