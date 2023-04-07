import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getGuildReactions } from "../storage";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('list all queridometro voting reactions'),
    async execute(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.guild) {
            const reactions = await getGuildReactions(interaction.guild.id);
            const strings: string[] = [];
            reactions.forEach((value, key) => {
                strings.push(`${key} (${value})`);
            });
            const reply = strings.join("\n");
            await interaction.reply(reply);

        } else {
            await interaction.followUp({
                content: "unable to identify guild",
                ephemeral: true
            });
        }
    }
}
