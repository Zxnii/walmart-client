const { remote } = require("electron")

const fs = require("fs"),
    path = require("path")

const Gui = require("./Gui"),
    Button = require("./Button"),
    ImageLoader = require("../util/ImageLoader"),
    BlurStack = require("../util/StackBlur"),
    GuiInputHandler = require("./GuiInputHandler"),
    MultiplayerMenu = require("./MultiplayerMenu")

class MainMenu extends Gui {
    constructor(guiRenderer) {
        super()

        this.guiRenderer = guiRenderer
        this.imageLoader = new ImageLoader()
        this.image = this.imageLoader.loadImageFromFile(path.join(__dirname, "../../res/splash/default.png"), "image/png")
        this.blurStack = new BlurStack()
        this.inputHandler = new GuiInputHandler(this)

        this.addGuiElement(new Button({
            x: 0,
            y: -25,
            width: 370,
            height: 40,
            text: "Single Player",
            relative: {
                x: 0.5,
                y: 0.5
            },
            inputHandler: this.inputHandler,
            click: () => {

            }
        }))
        this.addGuiElement(new Button({
            x: 0,
            y: 25,
            width: 370,
            height: 40,
            text: "Multiplayer",
            relative: {
                x: 0.5,
                y: 0.5
            },
            inputHandler: this.inputHandler,
            click: () => {
                this.guiRenderer.removeGui(this)
                this.inputHandler.freeListeners()
                this.guiRenderer.addGui(new MultiplayerMenu(this.guiRenderer, MainMenu))

                const activity = window.presence.getActivity()                
                activity.details = "In the multiplayer menu"
                window.presence.setActivity(activity)
            }
        }))
        this.addGuiElement(new Button({
            x: -60,
            y: 50,
            width: 40,
            height: 40,
            text: "×",
            relative: {x: 1, y: 0},
            font: "100 30px serif",
            inputHandler: this.inputHandler,
            click: () => {
                const window = remote.getCurrentWindow()
                window.close()
            }
        }))
        //this.addGuiElement(new RawText(0, 1, "Walmart Client", {x: 0.5, y: 0.5}, "500 36px Comic Sans MS"))
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