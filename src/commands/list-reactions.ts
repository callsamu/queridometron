import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getGuildReactions } from "../storage";
import { listReactions } from "../helpers";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('list all queridometro voting reactions'),
    async execute(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.guild) {
            const reactions = await getGuildReactions(interaction.guild.id);
            const reply = listReactions(reactions);
            await interaction.reply(reply);
        } else {
            await interaction.followUp({
                content: "unable to identify guild",
                ephemeral: true
            });
        }
    }
}
