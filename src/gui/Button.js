const BlurStack = require("../util/StackBlur")

class Button {
    constructor(x, y, width, height, text = "", center = true, centerText = true) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.text = text.split("").join(String.fromCharCode(8201))
        this.center = center
        this.centerText = centerText
    }

    draw(ctx) {
        const width = window.innerWidth,
            height = window.innerHeight

        ctx.font = "100 16px Helvetica"

        const textDimensions = ctx.measureText(this.text)

        const buttonX = (this.x*width)-(this.width/2),
            buttonY = (this.y*height)-(this.height/2)

        const textX = (this.x*width)-(textDimensions.width/2),
            textY = (this.y*height)+(textDimensions.actualBoundingBoxAscent/2)-(textDimensions.actualBoundingBoxDescent/2)

        ctx.fillStyle = "rgba(150, 150, 150, 0.5)"
        ctx.strokeStyle = "rgba(170, 170, 170, 0.3)"
        ctx.lineWidth = 3
        ctx.moveTo(buttonX+this.width/2, buttonY)
        ctx.roundedRect(buttonX, buttonY, this.width, this.height, 5)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = "rgb(200, 200, 200)"
        console.log(textDimensions)
        ctx.fillText(this.text, textX, textY)
        ctx.fillStyle = ""
        ctx.strokeStyle = ""
    }
}

module.exports = Button