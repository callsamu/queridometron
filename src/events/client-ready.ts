import { Client, Events } from "discord.js";
import { Command, Commands } from "../command";

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log(`logged in as ${client.user?.username}`);
    }
}
