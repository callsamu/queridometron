import { CommandInteraction, SlashCommandBuilder } from "discord.js";

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
        await interaction.reply("feito");
    }
}
