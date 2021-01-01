const Discord = require("discord-rpc")

class DiscordPresence {
    lastChange = 0
    queuedChange = {}
    constructor(id) {
        console.log("Connecting to DiscordRPC")

        this.rpc = new Discord.Client({transport: "ipc"})
        this.current = {}

        this.rpc.on("connected", () => {
            const starting = {
                details: "In the main menu",
                startTimestamp: new Date().getTime(),
                largeImageText: `Walmart Client | v${require("../package.json").version}`,
                largeImageKey: "large"
            }

            console.log("Connected to DiscordRPC")

            this.rpc.setActivity(starting)

            this.lastChange = Date.now()
            this.current = starting
        })

        this.rpc.login({clientId: id})
            .catch(err => {
                console.log(`Couldn't connect to DiscordRPC`)
            })
    }

    setActivity = (activity) => {
        if (Date.now() - this.lastChange >= 3000) {
            try {
                this.rpc.setActivity(activity)
                    .catch(err => {
                        
                    })
                this.current = activity
                this.lastChange = Date.now()
            } catch {

            }
        } else
            this.queueActivity(activity)
    }

    queueActivity = (activity) => {
        this.queuedChange = activity
        setTimeout(() => {
            this.setActivity(activity)
        }, (this.lastChange+3000)-Date.now())
    }

    getActivity = () => {
        return this.current
    }
}

module.exports = DiscordPresence