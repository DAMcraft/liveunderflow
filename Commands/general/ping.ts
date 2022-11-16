import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { DrippyClient } from '../../Utils/DrippyClient';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('A simple ping command!')

export async function execute(interaction: ChatInputCommandInteraction, client: DrippyClient) {
    const date = Date.now()
    const embed = new EmbedBuilder()
    .setTitle('🟢 Pong!')
    .setDescription(`**< Ping >** \n${date - interaction.createdTimestamp}ms`)
    .setColor('Green')
    .setFooter({
        text: `${client.config.name} - API Latency`
    })
    
    if(date - interaction.createdTimestamp > 90) {
        embed.setColor('Orange')
        embed.setTitle('🟠 Pong!')
    } else if (date - interaction.createdTimestamp > 180) {
        embed.setColor('Red')
        embed.setTitle('🔴 Pong!')
    }

    interaction.reply({
        embeds: [embed],
        ephemeral: true
    })
}