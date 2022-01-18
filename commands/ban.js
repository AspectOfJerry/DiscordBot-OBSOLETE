module.exports = {
    name: 'ban',
    description: "Usage: %ban <@user>",
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const commandHelp = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%ban command help')
                .setDescription('Usage: %ban <@user>')

            message.channel.send(commandHelp)
            return;
        }
        //code
        if(message.member.roles.cache.find(role => role.name === 'BotPL1')) {    //message.member
            const target = message.mentions.users.first();
            if(!args[0]) {
                const requireArgs0 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription('You must mention a member to ban!')

                message.channel.send(requireArgs0)
            } else {
                if(target) {
                    const memberTarget = message.guild.members.cache.get(target.id);
                    const userBannedBy = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User ban')
                        .setDescription(`<@${memberTarget.user.id}> was banned from the guild by <@${message.member.user.id}>`)
                        .setFooter(`To unban a member, go to "Server Settings" > "Bans" > "Revoke Ban".`)
                    const targetHigherThanSender403 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`<@${memberTarget.user.id}> has an equal or higher role than <@${message.member.user.id}>`)
                    const targetImmune403 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`<@${memberTarget.user.id}> is immune to this command!`)

                    if(memberTarget == message.member) {
                        const cannotUseOnSelf = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                            .setDescription('You cannot use this command on yourself!')

                        message.channel.send(cannotUseOnSelf);
                    } else {
                        if(message.member.roles.cache.find(role => role.name === 'BotPL0')) {   //message.member
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                                message.channel.send(targetImmune403);
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                                message.channel.send(targetHigherThanSender403)
                            } else {
                                try {
                                    memberTarget.ban().catch(console.error);    //Ban

                                    message.channel.send(userBannedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userBannedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userBannedBy)
                                } catch(error) {    //try   @53:33
                                    const errorCatch = new Discord.MessageEmbed()
                                        .setColor('#800080')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 58:33\nmessage.content = ${message.content}`)

                                    message.channel.send(errorCatch)
                                }
                            }
                        } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')) {    //message.member
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                                message.channel.send(targetImmune403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                                message.channel.send(targetHigherThanSender403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                                message.channel.send(targetHigherThanSender403)
                            } else {
                                try {
                                    memberTarget.ban().catch(console.error);    //Ban

                                    message.channel.send(userBannedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userBannedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userBannedBy)
                                } catch(error) {
                                    const errorCatch = new Discord.MessageEmbed()
                                        .setColor('#800080')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 83:35\nmessage.content = ${message.content}`)

                                    message.channel.send(errorCatch)
                                }
                            }
                        } else {
                            try {
                                memberTarget.ban().catch(console.error);    //Ban

                                message.channel.send(userBannedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userBannedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userBannedBy)
                            } catch(error) {
                                const errorCatch = new Discord.MessageEmbed()
                                    .setColor('#800080')
                                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                    .setTitle('Error Catch')
                                    .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                                    .setFooter(`An error was caught at line 101:31\nmessage.content = ${message.content}`)

                                message.channel.send(errorCatch)
                            }
                        }
                    }   //else  @45:23
                } else {    //if(target)    @17:17
                    const targetError = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription('Unknown user')

                    message.channel.send(targetError)
                }
            }   //else  @16:15
        } else {    //if(message.member.roles.cache.find(role => role.name === 'BotPL1'))   @5:9
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}
