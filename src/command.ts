import { Collection, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { importAllFromDir } from "./helpers";

export interface Command {
    data: SlashCommandBuilder;
    execute: (interaction: CommandInteraction) => void;
}

export type Commands = Collection<string, Command>;

export const commands = new Collection<string, Command>();

importAllFromDir('commands', (obj: any) => {
    const command: Command = obj;

    if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] One of the commands is missing a required "data" or "execute" property.`);
    }
});







