require("dotenv").config();

const {
    AkairoClient,
    CommandHandler,
    ListenerHandler
} = require("discord-akairo"),
    {
        Intents
    } = require("discord.js");

const Dokdo = require("dokdo");
const { owners } = require("../config");
const { join } = require("path");

module.exports = class CustomClient extends AkairoClient {
    constructor() {
        super({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
            ownerID: owners
        });
// command 지정
        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, "..", "commands"),
            prefix: "p",
            automateCategories: true,
            handleEdits: true,
            commandUtil: true,
            argumentDefaults: {
                prompt: {
                    modifyStart: (_, str) => str,
                    modifyRetry: (_, str) => str,
                    timeout: "Timeout!",
                    ended: "Ended!",
                    cancel: "Canceled.",
                    retries: 3,
                    cancelWord: "cancel"
                },
                otherwise: ""
            },
            ignorePermissions: owners
        });
// set listener(event)
        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, "..", "listeners"),
            automateCategories: true
        });
// set dokdo
        this.dokdo = Dokdo;
    }
// init 스크립트 생성
    async _init() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
// dokdo (관리자 파일) 지정
        this.dokdo = new Dokdo(this, {
            prefix: "봇 접두사"[0],
            aliases: [
                "dokdo"
            ],
            owners: owners,
            secrets: [
                process.env.TOKEN
            ]
        });
    }
// start 스크립트 생성
    async start() {
        await this._init();
        return this.login(process.env.TOKEN);
    }
}