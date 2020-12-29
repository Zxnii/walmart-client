const Discord = require("discord-rpc")

class DiscordPresence {
    lastChange = 0
    queuedChange = {}
    constructor(id) {
        console.log("Connecting to DiscordRPC")

        this.rpc = new Discord.Client({transport: "ipc"})

        this.rpc.on("connected", () => {
            console.log("Connected to DiscordRPC")

            this.rpc.setActivity({
                details: "In the main menu",
                startTimestamp: new Date().getTime(),
                largeImageText: `Walmart Client | v${require("../package.json").version}`,
                largeImageKey: "large"
            })

            this.lastChange = Date.now()
        })

        this.rpc.login({clientId: id})
    }

    setActivity(activity) {
        if (Date.now() - this.lastChange >= 15000)
            this.rpc.setActivity(activity)
        else
            this.queueActivity(activity)
    }

    queueActivity(activity) {
        this.queuedChange = activity
        setTimeout(() => {
            this.setActivity(activity)
        }, (this.lastChange+15000)-Date.now())
    }
}

module.exports = DiscordPresence