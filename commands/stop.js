module.exports = {
    name: 'stop',
    aliases: ['altf4', 'alt-f4', 'alt_f4', 'terminate', 'shutdown', 'shut-down', 'shut_down', 'term'],
    description: 'Usage: "%stop"',
    execute(message, args, cmd, client, Discord) {
        const requireConfirm = new Discord.MessageEmbed()
            .setColor('#ff10f0')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Do you **really** want to stop the process?')
            .setDescription(`**Important!**\nThis command **exits** the bot's program rendering the bot **unusable** until a bot operator manually restarts it via the terminal.\nUse the command **only** if needed!\nDo you understand and agree? You have 15 seconds to reply "yes" or "no".`)
            .setFooter('Request pending [15s]')
        const requestAborted = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`Request aborted`)
        const requestTimeout = new Discord.MessageEmbed()
            .setColor('#800080')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription("Request timeout")
        const processExit = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`Exiting process with code 0`)
        const status = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Bot shutdown')
            .setDescription('A user stopped the bot')
            .addField(`Username:`, `<@${message.member.user.id}>`, true)
            .addField(`User Discriminator:`, `#${message.member.user.discriminator}`, true)
            .addField(`User ID:`, `${message.member.user.id}`, true)
            .addField(`message.content =`, `${message.content}`, true)

        if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {   //message.member
            let filter = m => m.author.id === message.author.id

            message.channel.send(requireConfirm);

            message.channel.awaitMessages(filter, {
                max: 1,
                time: 15000,
                errors: ['time']
            })
                .then(message => {
                    message = message.first()
                    if(message.content.toUpperCase() == 'YES') {    //message.content
                        message.channel.send(processExit)
                        message.guild.channels.cache.find(channel => channel.name.includes('status')).send(`<@611633988515266562>`)
                        //message.guild.channels.cache.find(channel => channel.name.includes('status')).send('<@&871382141886406707>')
                        message.guild.channels.cache.find(channel => channel.name.includes('status')).send(status)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(`<@611633988515266562>`)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(status)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-command')).send(`<@611633988515266562>`)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-command')).send(status)
                        message.guild.channels.cache.find(channel => channel.name.includes('terminal')).send(`<@611633988515266562>`)
                        message.guild.channels.cache.find(channel => channel.name.includes('terminal')).send(status)
                        message.guild.channels.cache.find(channel => channel.name.includes('general')).send(`<@611633988515266562>`)
                        message.guild.channels.cache.find(channel => channel.name.includes('staff-chat')).send(`<@611633988515266562>`)
                        message.guild.channels.cache.find(channel => channel.name.includes('staff-chat')).send(status)
                        message.channel.send(`<@611633988515266562>`)
                        message.channel.send(status)
                            .then(() => process.exit(0));
                    } else if(message.content.toUpperCase() == 'NO') {  //message.content
                        message.channel.send(requestAborted);
                    } else if(message.content.toUpperCase() !== 'YES' || message.content.toUpperCase() !== 'NO') {
                        message.channel.send(requestAborted);
                    }
                })
                .catch(collected => {
                    message.channel.send(requestTimeout)
                });
        } else {
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}
