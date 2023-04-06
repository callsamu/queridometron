import { Events, Interaction } from "discord.js";
import { commands, Command } from "../command";

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;

        const name = interaction.commandName;
        const command: Command | undefined = commands.get(name);

        if (!command) {
            console.log(`No command matching ${command} was found`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
            } else {
                await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
            }
        }
    }
}
