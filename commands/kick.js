module.exports = {
    name: 'kick',
    aliases: ['cassetoi', 'casse-toi', 'casse_toi', 'wolacassetoi', 'wola-casse-toi', 'wola_casse_toi'],
    description: "Usage: %kick <@user>",
    execute(message, args, cmd, client, Discord) {
        if(message.member.roles.cache.find(role => role.name === 'BotPL2')) {
            const target = message.mentions.users.first()
            if(!args[0]) {
                const requireArgs0 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error')
                    .setDescription('You must mention a member')
                    .setFooter(`%kick "<args[0]>"`)

                message.channel.send(requireArgs0)
            } else {
                if(target) {
                    const memberTarget = message.guild.members.cache.get(target.id);
                    const userKickedBy = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User kick')
                        .setDescription(`<@${memberTarget.user.id}> was kicked from the guild by <@${message.member.user.id}>`)
                        .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 64})}`)
                    const targetHigherThanSender403 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Permissions error')
                        .setDescription(`<@${memberTarget.user.id}> has an equal or higher role than <@${message.member.user.id}>`)
                    const targetImmune403 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Permissions error')
                        .setDescription(`<@${memberTarget.user.id}> is immune to this command!`)
                    if(memberTarget == message.member) {
                        const cannotUseOnSelf = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                            .setTitle('Error')
                            .setDescription('You cannot use this command on yourself!')

                        message.channel.send(cannotUseOnSelf)
                    } else {
                        if(message.member.roles.cache.find(role => role.name === 'BotPL0')) {
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {
                                message.channel.send(targetImmune403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {
                                message.channel.send(targetHigherThanSender403)
                            } else {
                                try {
                                    memberTarget.kick().catch(console.error)

                                    message.channel.send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                                } catch(error) {
                                    const errorCatch = new Discord.MessageEmbed()
                                        .setColor('#800080')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 58:35\nmessage.content = ${message.content}`)

                                    message.channel.send(errorCatch)
                                }
                            }
                        } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')) {
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {
                                message.channel.send(targetImmune403);
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {
                                message.channel.send(targetHigherThanSender403);
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {
                                message.channel.send(targetHigherThanSender403);
                            } else {
                                try {
                                    memberTarget.kick().catch(console.error)

                                    message.channel.send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                                } catch(error) {
                                    const errorCatch = new Discord.MessageEmbed()
                                        .setColor('#800080')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 83:35\nmessage.content = ${message.content}`)

                                    message.channel.send(errorCatch)
                                }
                            }
                        } else if(message.member.roles.cache.find(role => role.name === 'BotPL2')) {
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {
                                message.channel.send(targetImmune403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {
                                message.channel.send(targetHigherThanSender403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {
                                message.channel.send(targetHigherThanSender403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) {
                                message.channel.send(targetHigherThanSender403)
                            } else {
                                try {
                                    memberTarget.kick().catch(console.error)

                                    message.channel.send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                                } catch(error) {
                                    const errorCatch = new Discord.MessageEmbed()
                                        .setColor('#800080')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 110:35\nmessage.content = ${message.content}`)

                                    message.channel.send(errorCatch)
                                }
                            }
                        } else {
                            try {
                                memberTarget.kick().catch(console.error)

                                message.channel.send(userKickedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                            } catch(error) {
                                const errorCatch = new Discord.MessageEmbed()
                                    .setColor('#800080')
                                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                    .setTitle('Error Catch')
                                    .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                    .setFooter(`An error was caught at line 128:31\nmessage.content = ${message.content}`)

                                message.channel.send(errorCatch)
                            }
                        }
                    }
                } else {
                    const targetError = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription('The targeted member is invalid')
                        .setFooter(`%kick "<args[0]>"`)

                    message.channel.send(targetError)
                }
            }
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
