const events = require("events")

const DiscordPresence = require("./DiscordPresence"),
    GuiRenderer = require("./gui/GuiRenderer"),
    MainMenu = require("./gui/MainMenu"),
    CanvasPatcher = require("./util/CanvasPatcher")

class Minecraft extends events.EventEmitter {
    guiRenderer
    canvases = []
    constructor() {
        super()

        try {
            const canvasPatcher = new CanvasPatcher()

            canvasPatcher.patchRoundedRect()

            this.canvases = document.querySelectorAll("canvas")

            this.setCanvases()
            this.init()
            this.guiRenderer = new GuiRenderer(this)

            this.guiRenderer.addGui(new MainMenu())
        } catch (err) {
            console.error(err)
        }
        window.presence = new DiscordPresence("771792365744291850")
    }

    draw() {
        window.requestAnimationFrame(() => {
            this.emit("render")
            this.draw()
        })
    }

    init() {
        window.addEventListener("resize", () => {
            this.setCanvases()
            this.emit("render")
        }, false)
    }

    setCanvases() {
        for (const canvas of this.canvases) {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
    }
}

new Minecraft()