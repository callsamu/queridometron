import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { keyv } from "src/keyv";

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

        keyv.set(reaction, subtitle);
        await interaction.reply(`${reaction} (${subtitle})`);
    }
}
