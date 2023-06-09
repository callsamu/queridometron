import { CommandInteraction, GuildMemberRoleManager, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { addGuildReaction } from "../storage";
import { isValidEmoji, memberHasValidRole } from "../helpers";

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

        if (!interaction.member) {
            await interaction.reply({
                content: "ERROR: Could not identify member.",
                ephemeral: true
            });
            return;
        }

        if (memberHasQueridometroRole(interaction.member)) {
            await interaction.reply({
                content: "ERROR: to use this command, you must have the 'queridometro' role.",
                ephemeral: true
            });
            return;
        }

        const reaction = interaction.options.getString('reaction');
        const subtitle = interaction.options.getString('subtitle');

        if (!reaction || !subtitle) {
            await interaction.followUp({
                content: "ERROR: Reaction or subtitle not provided.",
                ephemeral: true
            });
            return;
        }

        console.log(reaction);

        if (!isValidEmoji(reaction)) {
            await interaction.reply({
                content: "ERROR: Reaction is not a valid emoji.",
                ephemeral: true
            });
            return;
        }

        if (interaction.guild) {
            await addGuildReaction(interaction.guild.id, reaction, subtitle);
        } else {
            await interaction.reply({
                content: "ERROR: Unable to identify guild.",
                ephemeral: true
            });
        }

        await interaction.reply(`${reaction} ${subtitle}`);
    }
}
