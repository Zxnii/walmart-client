const path = require("path")

const { BrowserWindow, app, screen } = require("electron")

class Setup {
    constructor() {
        this.listen()
    }

    setupWindow() {
        const window = new BrowserWindow({
            width: 780,
            height: 560,
            show: false,
            title: `Singularity Client | v${require("../package.json").version}`,
            icon: path.join(__dirname, "../res/icons/icon.png"),
            webPreferences: {
                nodeIntegration: true,
                nodeIntegrationInWorker: true,
                navigateOnDragDrop: false,
                webgl: true
            }
        })

        window.loadFile(path.join(__dirname, "/display.htm"))

        window.on("ready-to-show", () => {
            window.show()
            //window.setMenu(null)
        })
    }

    listen() {
        app.on("ready", () => {
            this.setupWindow()
        })
    }
}

module.exports = Setup