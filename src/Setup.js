const path = require("path"),
    process = require("process"),
    fs = require("fs")

const { BrowserWindow, app, screen } = require("electron")

class Setup {
    constructor(runDir = path.join(__dirname, "../run")) {
        this.listen()

        this.runDir = runDir

        if (!fs.existsSync(runDir))
            fs.mkdirSync(runDir, {recursive: true})
    }

    setupWindow() {
        const window = new BrowserWindow({
            width: 780,
            height: 560,
            show: false,
            title: `Walmart Client | v${require("../package.json").version}`,
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