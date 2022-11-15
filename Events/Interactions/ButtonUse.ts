import { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from 'discord.js';
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        if(!interaction.isButton()) return;

        if(interaction.customId === `apply:close`) {
            if(!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
                return interaction.reply({
                    content: `**You are not allowed to close this channel.**`,
                    ephemeral: true
                })
            }

            interaction.reply({
                content: `⚠️ **Please confirm that you would like to delete the channel - <@${interaction.member.user.id}>.**`,
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                        .setCustomId(`apply:close:confirm`)
                        .setLabel(`Confirm`)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(`💠`)
                    ).addComponents(
                        new ButtonBuilder()
                        .setCustomId(`apply:close:cancel`)
                        .setLabel(`Cancel`)
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji(`❌`)
                    )
                ]
            })
        }

        if(interaction.customId === `apply:approve`) {
            if(!interaction.member.roles.cache.find(r => r.id === client.config.rw)) {
                return interaction.reply({
                    content: `You are not allowed to approve users for the RW role`,
                    ephemeral: true
                })
            }

            const usr = interaction.guild.members.cache.find(m => m.id === interaction.channel.topic);
            usr.roles.add(interaction.guild.roles.cache.find(r => r.id === client.config.rw))
            interaction.reply({
                content: `**🥳 Congrats <@${usr.user.id}>! You have been approved for the \`rw\` role!**`
            })
        }

        if(interaction.customId === `apply:close:confirm`) {
            interaction.reply({
                content: `**Deletion Confirmed** - Deleting channel - <@${interaction.member.user.id}>`
            })
            wait(3000)
            interaction.channel.delete()
        }

        if(interaction.customId === `apply:close:cancel`) {
            interaction.reply({
                content: `**✅ Deletion Canceled** - <@${interaction.member.user.id}>`
            })
        }

        
    }
}
