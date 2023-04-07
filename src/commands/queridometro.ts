import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, MessageComponentInteraction, SlashCommandBuilder } from "discord.js";
import { getGuildReactions } from "../storage";
import { listReactions } from "../helpers";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queridometro')
        .setDescription('start queridometro voting'),
    async execute(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Join voting')
                    .setStyle(ButtonStyle.Primary),
            );

        if (!interaction.guild) {
            await interaction.followUp({
                content: 'unable to identify guild',
                ephemeral: true
            });
            return;
        }

        const reactions = await getGuildReactions(interaction.guild.id);
        const reactionsInString = listReactions(reactions);

        if (reactionsInString === '') {
            await interaction.reply("no reactions are available. use the /add command to add one");
            return;
        }

        const response = await interaction.reply({
            content: `QUINTO QUERIDOMETRO DA PQP\n${reactionsInString}`,
            components: [row]
        })

        const filter = (i: MessageComponentInteraction) => i.customId === 'primary';

        const collector = response.createMessageComponentCollector({
            filter, time: 10000000
        });

        collector.on('collect', async i => {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(i.user.username)
                .setThumbnail(i.user.avatarURL());

            if (i.channel) {
                const message = await i.reply({
                    embeds: [embed],
                    fetchReply: true
                });

                reactions.forEach((_, emoji) => {
                    message.react(emoji);
                });
            }
        });
    }
}
