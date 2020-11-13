const fs = require("fs")

class ImageLoader {
    constructor() {

    }

    loadImageFromFile(path, mime) {
        const data = fs.readFileSync(path, {encoding: "base64"})
        const src = `data:${mime};base64,${data}`

        const img = document.createElement("img")

        img.src = src

        return img
    }
}

module.exports = ImageLoader