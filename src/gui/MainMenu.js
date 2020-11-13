const fs = require("fs"),
    path = require("path")

const Gui = require("./Gui"),
    Button = require("./Button"),
    CloseButton = require("./CloseButton"),
    ImageLoader = require("../util/ImageLoader"),
    BlurStack = require("../util/StackBlur")

class MainMenu extends Gui {
    constructor() {
        super()

        this.imageLoader = new ImageLoader()
        this.image = this.imageLoader.loadImageFromFile(path.join(__dirname, "../../res/splash/default.png"), "image/png")
        this.blurStack = new BlurStack()

        this.addGuiElement(new Button(0.5, 0.45, 370, 40, "Single Player"))
        this.addGuiElement(new Button(0.5, 0.55, 370, 40, "Multiplayer"))
        this.addGuiElement(new CloseButton(0.95, 0.075, 40, 40, "×"))
    }

    draw(ctx) {
        const width = window.innerWidth,
            height = window.innerHeight
        ctx.drawImage(this.image, (width/2)-(this.image.width/2), (height/2)-(this.image.height/2))
        this.blurStack.stackBlurCanvasRGBA(ctx, 0, 0, window.innerWidth, window.innerHeight, 30)
        this.drawElements(ctx)
    }
}

module.exports = MainMenu