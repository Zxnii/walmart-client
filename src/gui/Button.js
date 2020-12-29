const BlurStack = require("../util/StackBlur")

class Button {
    constructor(opt) {
        const options = {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            text: "",
            relative: {
                x: 0,
                y: 0
            },
            font: "12px Helvetica"
        }

        for (const [key, value] of Object.entries(opt)) {
            options[key] = value
        }

        this.x = options.x
        this.y = options.y
        this.width = options.width
        this.height = options.height
        this.text = options.text
        this.relative = options.relative
        this.font = options.font

        console.log()
    }

    draw(ctx) {
        const width = window.innerWidth,
            height = window.innerHeight

        ctx.font = this.font

        const textDimensions = ctx.measureText(this.text)

        const x = this.relative.x*width,
            y = this.relative.y*height

        const buttonX = (x+this.x)-(this.width/2),
            buttonY = (y+this.y)-(this.height/2)

        const textX = (x+this.x)-(textDimensions.width/2),
            textY = (y+this.y)+(textDimensions.actualBoundingBoxAscent/2)-(textDimensions.actualBoundingBoxDescent/2)

        ctx.fillStyle = "rgba(150, 150, 150, 0.5)"
        ctx.strokeStyle = "rgba(170, 170, 170, 0.3)"
        ctx.lineWidth = 3
        ctx.moveTo(buttonX+this.width/2, buttonY)
        ctx.roundedRect(buttonX, buttonY, this.width, this.height, 5)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = "rgb(200, 200, 200)"
        ctx.fillText(this.text, textX, textY)
        ctx.fillStyle = ""
        ctx.strokeStyle = ""
    }
}

module.exports = Button