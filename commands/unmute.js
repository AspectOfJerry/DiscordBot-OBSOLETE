module.exports = {
    name: 'unmute',
    aliases: ['un-mute', 'un_mute'],
    description: 'Usage: "%unmute <@user>"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const commandHelp = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setTitle('%unmute command help')
                .setDescription('This command unmutes a muted member.')
                .addField(`Usage`, "`%unmute` `<@user>`", true)
                .addField(`Aliases`, "`un-mute`, `un_mute`", true)
                .setFooter('This command is not case-sensitive.')

            message.channel.send(commandHelp)
            return;
        }
        //code
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {   //message.member
            const target = message.mentions.users.first();
            if(!args[0]) {
                const requireArgs0 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription('You must mention a member to unmute!')

                message.channel.send(requireArgs0)
            } else {
                if(target) {
                    let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                    let memberTarget = message.guild.members.cache.get(target.id);
                    const userUnmutedBy = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User unmute')
                        .setDescription(`<@${memberTarget.user.id}> was unmuted by <@${message.member.user.id}>`)
                        .setFooter(`To mute a member, use "%mute <@user> (<duration>)"`)
                    const targetHigherThanSender403 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`<@${memberTarget.user.id}> has an equal or higher role than <@${message.member.user.id}>`)
                    const targetImmune403 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`<@${memberTarget.user.id}> is immune to this command!`)
                    const userNotMuted = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`<@${memberTarget.user.id}> is not muted!`)
                    if(message.member == memberTarget) {
                        const cannotUseOnSelf = new Discord.MessageEmbed()
                            .setColor('#800080')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                            .setDescription('You cannot use this command on yourself!')

                        message.channel.send(cannotUseOnSelf)
                    } else {
                        if(!memberTarget.roles.cache.find(role => role.name === 'Muted')) {
                            message.channel.send(userNotMuted)
                        } else {
                            if(message.member.roles.cache.find(role => role.name === 'BotPL0')) {   //message.member
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                                    message.channel.send(targetImmune403);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                                    message.channel.send(targetHigherThanSender403);
                                } else {
                                    try {
                                        memberTarget.roles.remove(muteRole.id)

                                        message.channel.send(userUnmutedBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#800080')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                                            .setDescription(`An error was caught at line 66:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')) {    //message.member
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                                    message.channel.send(targetImmune403);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                                    message.channel.send(targetHigherThanSender403);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                                    message.channel.send(targetHigherThanSender403);
                                } else {
                                    try {
                                        memberTarget.roles.remove(muteRole.id)

                                        message.channel.send(userUnmutedBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#800080')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                                            .setDescription(`An error was caught at line 90:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            } else if(message.member.roles.cache.find(role => role.name === 'BotPL2')) {    //message.member
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                                    message.channel.send(targetImmune403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) { //memberTarget
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) {  //memberTarget
                                    message.channel.send(targetHigherThanSender403)
                                } else {
                                    try {
                                        memberTarget.roles.remove(muteRole.id)

                                        message.channel.send(userUnmutedBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#800080')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                                            .setDescription(`An error was caught at line 116:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            } else if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {    //message.member
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                                    message.channel.send(targetImmune403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) {  //memberTarget
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL3')) {  //memberTarget
                                    message.channel.send(targetHigherThanSender403)
                                } else {
                                    try {
                                        memberTarget.roles.remove(muteRole.id)

                                        message.channel.send(userUnmutedBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#800080')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                                            .setDescription(`An error was caught at line 144:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            } else {
                                try {
                                    memberTarget.roles.remove(muteRole.id)

                                    message.channel.send(userUnmutedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                                } catch(error) {
                                    const errorCatch = new Discord.MessageEmbed()
                                        .setColor('#800080')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                                        .setDescription(`An error was caught at line 161:35\nmessage.content = ${message.content}`)

                                    message.channel.send(errorCatch)
                                }
                            }
                        }
                    }
                } else {
                    const targetError = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription('Unknown user')

                    message.channel.send(targetError)
                }
            }
        } else {
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}
