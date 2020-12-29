const { EventEmitter } = require("events")

module.exports = class GuiInputHandler extends EventEmitter {
    constructor(canvas) {
        canvas.addEventListener("click", this._listener)
    }

    _listener = (e) => {
        console.log(e)
    }
}