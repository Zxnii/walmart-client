class GuiRenderer {
    canvas
    ctx
    guis = []
    game
    old = undefined
    constructor(game) {
        const canvas = document.querySelector("#gui")
        this.game = game
        this.guis = []
        this.ctx = canvas.getContext("2d")

        this.draw(true)

        this.game.on("render", (force) => {
            this.draw(force)
        })
    }

    draw(force) {
        if (this.old != this.guis || force) {
            this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

            this.ctx.beginPath()
            for (const gui of this.guis) {
                gui.draw(this.ctx)
            }
            this.old = this.guis
        }
    }

    addGui(gui) {
        this.guis.push(gui)
        gui.setctx(this.ctx)
        this.draw(true)
    }

    removeGui(gui) {
        for (let i = 0; i < this.guis.length; i++) {
            const _gui = this.guis[i]
            if (_gui == gui) {
                this.guis.splice(i, 1)
            }
        }
        this.draw(true)
    }
}

module.exports = GuiRenderer