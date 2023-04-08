import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { addGuildReaction } from "../storage";
import { isValidEmoji } from "../helpers";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('add a reaction to queridometro voting')
        .addStringOption(option =>
            option
                .setName('reaction')
                .setDescription('the emoji for the reaction')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('subtitle')
                .setDescription('subtitle for the queridometro reaction')
                .setRequired(true)),
    async execute(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return

        const reaction = interaction.options.getString('reaction');
        const subtitle = interaction.options.getString('subtitle');

        if (!reaction || !subtitle) {
            await interaction.followUp({
                content: "reaction or subtitle not provided",
                ephemeral: true
            });
            return;
        }

        if (!isValidEmoji(reaction)) {
            await interaction.followUp({
                content: "reaction is not a valid emoji",
                ephemeral: true
            });
        }

        if (interaction.guild) {
            await addGuildReaction(interaction.guild.id, reaction, subtitle);
        } else {
            await interaction.followUp({
                content: "unable to identify guild",
                ephemeral: true
            });
        }


        console.log(reaction);
        await interaction.reply(`${reaction} ${subtitle}`);
    }
}
