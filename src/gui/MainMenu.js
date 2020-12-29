const fs = require("fs"),
    path = require("path")

const Gui = require("./Gui"),
    Button = require("./Button"),
    ImageLoader = require("../util/ImageLoader"),
    BlurStack = require("../util/StackBlur"),
    RawText = require("./RawText")

class MainMenu extends Gui {
    constructor() {
        super()

        this.imageLoader = new ImageLoader()
        this.image = this.imageLoader.loadImageFromFile(path.join(__dirname, "../../res/splash/default.png"), "image/png")
        this.blurStack = new BlurStack()

        this.addGuiElement(new Button({
            x: 0,
            y: -50,
            width: 370,
            height: 40,
            text: "Single Player",
            relative: {
                x: 0.5,
                y: 0.5
            }
        }))
        this.addGuiElement(new Button({
            x: 0,
            y: 50,
            width: 370,
            height: 40,
            text: "Multiplayer",
            relative: {
                x: 0.5,
                y: 0.5
            }
        }))
        this.addGuiElement(new Button(-60, 50, 40, 40, "×", {x: 1, y: 0}, "100 30px serif"))

        this.addGuiElement(new RawText(0, -120, "Walmart Client", {x: 0.5, y: 0.5}, "500 36px Comic Sans MS"))
    }

    draw(ctx) {
        const width = window.innerWidth,
            height = window.innerHeight
        ctx.drawImage(this.image, (width/2)-(this.image.width/2), (height/2)-(this.image.height/2))
        this.blurStack.stackBlurCanvasRGBA(ctx, 0, 0, window.innerWidth, window.innerHeight, 15)
        this.drawElements(ctx)
    }
}

module.exports = MainMenu