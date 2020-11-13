class CanvasPatcher {
    constructor() {

    }

    patchRoundedRect() {
        CanvasRenderingContext2D.prototype.roundedRect = function (x, y, width, height, rounded) {
            const halfRadians = (2 * Math.PI) / 2
            const quarterRadians = (2 * Math.PI) / 4

            this.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true)
            this.lineTo(x, y + height - rounded)
            this.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true)
            this.lineTo(x + width - rounded, y + height)
            this.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true)
            this.lineTo(x + width, y + rounded)
            this.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true)
            this.lineTo(x + rounded, y)
        }
    }
}

module.exports = CanvasPatcher