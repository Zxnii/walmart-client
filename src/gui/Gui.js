class Gui {

    elements = []
    ctx

    constructor() {
        
    }

    setctx(ctx) {
        this.ctx = ctx
    }

    addGuiElement(element) {
        this.elements.push(element)
        //this.draw(this.ctx)
    }

    drawElements(ctx) {
        for (const element of this.elements) {
            element.draw(ctx)
        }
    }

    draw(ctx) {
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
        this.drawElements(ctx)
    }
}

module.exports = Gui