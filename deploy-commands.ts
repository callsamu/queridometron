import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import path from 'node:path';

import { Command } from './src/command';
import { importAllFromDir } from './src/helpers';

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

const token = process.env.DISCORD_TOKEN;
if (!token) {
    console.error("Token must be provided");
    process.exit(1);
}

const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;
if (!clientId || !guildId) {
    console.error("ClientID and GuildID must be provided");
    process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    await importAllFromDir('commands', obj => {
        const command: Command = obj;
        commands.push(command.data.toJSON());
    });

    try {

        console.log(`started refreshing ${commands.length} application (/) commands`);

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`successfully reloaded application (/) commands`);
    } catch (error) {
        console.error(error);
    }
})();
