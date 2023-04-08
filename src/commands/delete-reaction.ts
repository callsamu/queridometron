import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { deleteGuildReaction } from "../storage";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("delete a reaction")
        .addStringOption(option =>
            option
                .setName('reaction')
                .setDescription('the reaction to be deleted')
                .setRequired(true)),
    async execute(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        if (!interaction.guild) {
            await interaction.reply({
                content: "unable to identify guild",
                ephemeral: true
            });
            return;
        }

        const reaction = interaction.options.getString('reaction');
        if (!reaction) {
            await interaction.reply({
                content: "no reaction was provided for deletion.",
                ephemeral: true
            });
            return;
        }

        const id = interaction.guild.id;
        const existed = await deleteGuildReaction(id, reaction);

        if (existed) {
            await interaction.reply({
                content: `successfully deleted reaction: ${reaction}`,
            });
            return;
        }

        await interaction.reply({
            content: "the reaction does not exists.",
            ephemeral: true
        });
    }
}
