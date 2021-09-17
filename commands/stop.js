module.exports = {
    name: 'stop',
    aliases: ['altf4', 'alt-f4', 'arlt_f4', 'terminate', 'shutdown', 'shut-down', 'shut_down'],
    cooldown: 256,
    description: 'Usage: "%stop"',
    execute(message, args, cmd, client, Discord){
        const requireConfirm = new Discord.MessageEmbed()
            .setColor('#ff10f0')
            .setTitle('Do you **really** want to stop the process?')
            .setDescription(`**Important!**\nThis command **exits** the bot's program rendering the bot **unusable** until a bot operator manually restarts it via the terminal.\nUse the command **only** if needed!\nDo you understand and agree? You have 30 seconds to reply "yes" or "no".`)
            .setFooter('Request pending [30s]')
        const requireDoubleConfirm = new Discord.MessageEmbed()
            .setColor('#ff10f0')
            .setTitle('Double confirm')
            .setDescription(`Do you **really** want to stop the process? You have 3 seconds to reply "yes" or "no". This is the last step, make a wise decision.`)
            .setFooter('Request pending [3s]')
        const requestAborted = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Request Aborted')
            .setDescription(`Request sender has aborted the request`)
        const requestTimeout = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Timeout')
            .setDescription("Request timeout")
        const terminatingProcess = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Terminating Process')
            .setDescription(`<@${message.member.user.id}> requested a bot shutdown. **Process will be killed after the next message!**`)
            .setFooter('message.channel.send(processExit)\n.then(() => process.exit(0));')
        const processExit = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`Exiting process with code 0`)
            .setFooter('.then(() => process.exit(0));')
        const status = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setTitle('Bot shutdown 0x0(0)')
            .setDescription('A user stopped the bot')
            .addField(`Username:`, `<@${message.member.user.id}>`, true)
            .addField(`User ID:`, `${message.member.user.id}`, true)
            .addField(`message.content =`, `${message.content}`, true)
            .setFooter(`[Operators only]\nTo restart the bot, go in the terminal and type in "node main.js" or "node .".`)

        if(message.member.roles.cache.find(role => role.name === 'BotPL3')){    //If 'message.member' has the role 'BotPL3'
            let filter = m => m.author.id === message.author.id

            message.channel.send(requireConfirm);

            message.channel.awaitMessages(filter, {
              max: 1,
              time: 30000,
              errors: ['time']
            })
            .then(message => {
              message = message.first()
                if(message.content.toUpperCase() == 'YES'){ //If 'message.content' to upper case is equal to "YES"
                    let filter = m => m.author.id === message.author.id

                    message.channel.send(requireDoubleConfirm)

                    message.channel.awaitMessages(filter, {
                      max: 1,
                      time: 3000,
                      errors: ['time']
                    })
                    .then(message => {
                      message = message.first()
                        if(message.content.toUpperCase() == 'YES'){ //If 'message.content' to upper case is equal to "YES"
                            message.channel.send(terminatingProcess)
                            message.guild.channels.cache.find(channel => channel.name.includes('status')).send(`<@871382141886406707>`)
                            message.guild.channels.cache.find(channel => channel.name.includes('status')).send(status)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-logs')).send(status)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-team')).send(status)
                            client.user.setActivity('process.exit(0);', { type: 'PLAYING' })
                            message.channel.send(processExit)
                            .then(() => process.exit(0));
                        } else if(message.content.toUpperCase() == 'NO'){ //If 'message.content' to upper case is equal to "NO"
                            message.channel.send(requestAborted);
                        }
                    })
                    .catch(collected => {
                        message.channel.send(requestTimeout)
                    });
                } else if(message.content.toUpperCase() == 'NO'){ //If 'message.content' to upper case is equal to "NO"
                    message.channel.send(requestAborted);
                }
            })
            .catch(collected => {
                message.channel.send(requestTimeout)
            });
        } else{
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")
                .setFooter(`message.content = ${message.content}`)

            message.channel.send(permissionsError)
        }
    }
}