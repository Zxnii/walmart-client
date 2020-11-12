const nodeConsole = require("console"),
    process = require("process")

const DiscordPresence = require("./DiscordPresence")

class Console extends nodeConsole.Console {
    _console = new nodeConsole.Console(process.stdout, process.stderr)

    constructor() {
        super(process.stdout, process.stderr)
    }

    log(message, ...optionalParams) {
        this._console.log(`[${new Date().toISOString()}] [Renderer/INFO] ${message}`, ...optionalParams)
    }

    error(data, ...optionalParams) {
        this._console.error(`[${new Date().toISOString()}] [Renderer/ERROR] ${data}`, ...optionalParams)
    }

    warn(data, ...optionalParams) {
        this._console.warn(`[${new Date().toISOString()}] [Renderer/WARN] ${data}`, ...optionalParams)
    }
}

class Minecraft {
    constructor() {
        this.canvases = document.querySelectorAll("canvas")

        this.setCanvases()
        this.init()

        window.console = new Console()
        window.presence = new DiscordPresence("771792365744291850")
    }

    init() {
        window.addEventListener("resize", () => {
            this.setCanvases()
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