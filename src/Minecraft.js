const events = require("events")

const DiscordPresence = require("./DiscordPresence"),
    GuiRenderer = require("./gui/GuiRenderer"),
    MainMenu = require("./gui/MainMenu"),
    CanvasPatcher = require("./util/CanvasPatcher")

class Minecraft extends events.EventEmitter {
    guiRenderer
    canvases = []
    frameCount = 0
    constructor() {
        super()

        const canvasPatcher = new CanvasPatcher()

        canvasPatcher.patchRoundedRect()

        this.canvases = document.querySelectorAll("canvas")

        this.setCanvases()
        this.init()
        this.draw()
        this.guiRenderer = new GuiRenderer(this)

        this.guiRenderer.addGui(new MainMenu(this.guiRenderer))
        this.emit("render")

        window.presence = new DiscordPresence("771792365744291850")
    }

    draw(force) {
        window.requestAnimationFrame(() => {
            this.emit("render", this.frameCount <= 3)
            this.draw()
            this.frameCount++
        })
    }

    init() {
        window.addEventListener("resize", () => {
            this.setCanvases()
        }, false)
    }

    setCanvases() {
        this.emit("render", true)
        this.frameCount = 0
        for (const canvas of this.canvases) {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
    }
}

new Minecraft()