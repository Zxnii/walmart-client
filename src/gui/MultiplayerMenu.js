const { remote } = require("electron")

const fs = require("fs"),
    path = require("path")

const Gui = require("./Gui"),
    Button = require("./Button"),
    ImageLoader = require("../util/ImageLoader"),
    BlurStack = require("../util/StackBlur"),
    GuiInputHandler = require("./GuiInputHandler")

class MultiplayerMenu extends Gui {
    constructor(guiRenderer, MainMenu) {
        super()

        this.guiRenderer = guiRenderer
        this.imageLoader = new ImageLoader()
        this.image = this.imageLoader.loadImageFromFile(path.join(__dirname, "../../res/splash/default.png"), "image/png")
        this.blurStack = new BlurStack()
        this.inputHandler = new GuiInputHandler(this)
        
        this.addGuiElement(new Button({
            width: 100,
            height: 40,
            x: 0,
            y: -60,
            relative: {
                x: 0.5,
                y: 1
            },
            text: "Back",
            inputHandler: this.inputHandler,
            click: () => {
                this.guiRenderer.removeGui(this)
                this.inputHandler.freeListeners()
                this.guiRenderer.addGui(new MainMenu(this.guiRenderer))

                const activity = window.presence.getActivity()                
                activity.details = "In the main menu"
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
    }

    draw(ctx) {
        const width = window.innerWidth,
            height = window.innerHeight
        ctx.drawImage(this.image, (width/2)-(this.image.width/2), (height/2)-(this.image.height/2))
        this.blurStack.stackBlurCanvasRGBA(ctx, 0, 0, window.innerWidth, window.innerHeight, 15)
        this.blurStack.stackBlurCanvasRGBA(ctx, 0, window.innerHeight-120, window.innerWidth, 120, 100)
        ctx.fillStyle = "rgba(150, 150, 150, 0.3)"
        ctx.fillRect(0, window.innerHeight-120, window.innerWidth, 120)
        this.drawElements(ctx)
    }
}

module.exports = MultiplayerMenu