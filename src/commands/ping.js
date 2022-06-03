const { command } = require("discord-akairo"),
    { message, CommandInteraction } = require("discord.js");

module.exports = class extends Command {
    constructor() {
        super("ping", {
            aliases: [
                "ping",
                "핑"
            ],
            channel: "guild"
        });
    }

    async exec(message = Message) {
        message.reply('당신의 핑은: ${this.client.ws.ping}')
    }
}