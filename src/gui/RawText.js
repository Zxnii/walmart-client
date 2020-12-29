class RawText {
    constructor(x, y, text, relative = {x: 0, y: 0}, font = "100 16px Helvetica") {
        this.x = x
        this.y = y
        this.text = text.split("").join(String.fromCharCode(8201))
        this.relative = relative
        this.font = font
    }

    draw(ctx) {
        const width = window.innerWidth,
            height = window.innerHeight

        const x = this.relative.x*width,
            y = this.relative.y*height

        ctx.font = this.font

        const textDimensions = ctx.measureText(this.text)

        const textX = (x+this.x)-(textDimensions.width/2),
            textY = (y+this.y)+(textDimensions.actualBoundingBoxAscent/2)-(textDimensions.actualBoundingBoxDescent/2)

        ctx.fillStyle = "rgb(200, 200, 200)"
        ctx.fillText(this.text, textX, textY)
    }
}

module.exports = RawText