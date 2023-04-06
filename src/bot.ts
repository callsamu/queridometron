import { importAllFromDir } from './helpers';
import { Event } from './event';
import { Client, Collection, CommandInteraction, Events, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

importAllFromDir('events', (obj: any) => {
    const event: Event = obj;
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

client.login(process.env.DISCORD_TOKEN);
