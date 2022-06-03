const { Listener } = require("discord-akairo");

module.exports = class extends Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready"
        });
    }

    async exec() {
        if(!this.client.user) return;

        console.log("ready.");
    }
}