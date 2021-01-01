const { EventEmitter } = require("events")

class GuiInputHandler extends EventEmitter {
    constructor(gui) {
        super()
        this.gui = gui
        this.setupListeners()
    }

    setupListeners = () => {
        document.addEventListener("click", this._clickListener)
    }

    freeListeners = () => {
        this.removeAllListeners("click")
        document.removeEventListener("click", this._clickListener)
    }

    _clickListener = (e) => {
        const width = window.innerWidth,
            height = window.innerHeight

        let clickElement = null
        for (const element of this.gui.elements) {
            const relative = element.relative
            const relX = relative.x*width,
                relY = relative.y*height
            const elementX = (relX+element.x)-(element.width/2),
                elementY = (relY+element.y)-(element.height/2)
            if (e.x >= elementX && e.x <= elementX+element.width) {
                if (e.y >= elementY && e.y <= elementY+element.height) {
                    clickElement = element
                    break
                }
            }
        }
        this.emit("click", e.x, e.y, clickElement)
    }
}

module.exports = GuiInputHandler