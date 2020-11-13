class GuiRenderer {
    ctx
    guis = []
    game
    constructor(game) {
        const canvas = document.querySelector("#gui")
        this.game = game
        this.guis = []
        this.ctx = canvas.getContext("2d")

        this.game.on("render", () => {
            this.draw()
        })
    }

    draw() {
        this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        for (const gui of this.guis) {
            gui.draw(this.ctx)
        }
    }

    addGui(gui) {
        this.guis.push(gui)
        gui.setctx(this.ctx)
        this.draw()
    }
}

module.exports = GuiRenderer