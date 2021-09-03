module.exports = {
    name: 'stop',
    aliases: ['terminate', 'shutdown', 'shut-down', 'shut_down'],
    cooldown: 256,
    description: 'Usage: "%stop"',
    execute(message, args, cmd, client, Discord){

        const requireConfirm = new Discord.MessageEmbed()
            .setColor('#ff10f0')
            .setTitle('Do you **really** want to __terminate__ the process?')
            .setDescription(`**Please read:**\nExecuting "%stop", "%terminate", "%shutdown" or "%shut_down" will terminate/exit the bot's program and thus, making the bot **unusable** until a bot operator __manually__ restarts it. Use is command **only** if __needed__! If the command is **executed** with __no__ valid __reason__, __consequences__ will apply. The **only** way to __restart__ the bot is via the terminal/command prompt which is __only__ accesible by the bot's __operators__.\n**Do you** __understand__ and __agree__? You have 30 seconds: "yes/no".`)
            .setFooter('Request pending [30s]')

        const requireDoubleConfirm = new Discord.MessageEmbed()
            .setColor('#ff10f0')
            .setTitle('Last confirmation. Do you **really** want to __terminate__ the process?')
            .setDescription(`Double confirmation required! You have 3 seconds: "yes/no". This is the last step, make a wise decision.`)
            .setFooter('Request pending [3s]')

        const requestAborted = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Request Aborted')
            .setDescription(`Request sender has aborted the request`)
            .setFooter('Request aborted')

        const requestTimeout = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Aborted request due to timeout')
            .setDescription("Timeout")
            .setFooter('408 REQUEST_TIMEOUT')

        const terminatingProcess = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Terminating Process')
            .setDescription(`<@${message.member.user.id}> **requested** a bot __shutdown__. **Process will be killed after the next message!**`)
            .setFooter('Next:\nmessage.channel.send(processExit)\n.then(() => process.exit(0));')

        const processExit = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`Exiting process with code 0`)
            .setFooter('.then(() => process.exit(0));')

        if(message.member.roles.cache.has('869995421794193518')){   //Checks if the sender has the role "BotP R3"
            let filter = m => m.author.id === message.author.id

            message.channel.send(requireConfirm);

            message.channel.awaitMessages(filter, {
              max: 1,
              time: 30000,
              errors: ['time']
            })
            .then(message => {
              message = message.first()
                if(message.content.toUpperCase() == 'YES'){
                    let filter = m => m.author.id === message.author.id

                    message.channel.send(requireDoubleConfirm)

                    message.channel.awaitMessages(filter, {
                      max: 1,
                      time: 3000,
                      errors: ['time']
                    })
                    .then(message => {
                      message = message.first()
                        if(message.content.toUpperCase() == 'YES'){
                            message.channel.send(terminatingProcess)
                            client.user.setActivity('.then(() => process.exit(0));', { type: 'PLAYING' })
                            message.channel.send(processExit)
                            .then(() => process.exit(0));
                        }
                        else if(message.content.toUpperCase() == 'NO'){
                            message.channel.send(requestAborted);
                        }
                    })
                    .catch(collected => {
                        message.channel.send(requestTimeout)
                    });
                }
                else if(message.content.toUpperCase() == 'NO'){
                    message.channel.send(requestAborted);
                }
            })
            .catch(collected => {
                message.channel.send(requestTimeout)
            });
        }
        else{
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do **not** have the __permissions__ to **perform** this __command__. Please contact the server administrators if you believe that this is an error.")
                .setFooter(`message.content = ${message.content}`)

            message.channel.send(permissionsError)
        }
    }
}