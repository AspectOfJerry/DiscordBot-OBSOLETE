module.exports = {
    name: 'mute',
    aliases: ['tempmute', 'temp-mute', 'temp_mute', 'shutup', 'shut-up', 'shut_up'],
    description: 'Usage: "%mute <@user> (<duration s/m/y>)"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%mute command help')
                .setDescription('This command mutes the mentioned user permanently is a duration is not provided.')
                .addField(`Usage`, "`%mute` `<@user>` (`<duration>`)", false)
                .addField(`Aliases`, "`tempmute`, `temp_mute`, `temp-mute`, `shutup`, `shut_up`, `shut-up`", false)
                .addField("Stats for nerds", "Lines: 272; File size: ~19.3 KB", false)
                .setFooter("This command is case-sensitive. (I don't actually know if it is case-sensitive or not. I'm gonna have to test it lol)")

            message.channel.send(helpCommand)
            return;
        }
        //Code
        const ms = require(`ms`)
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {
            const target = message.mentions.users.first();
            if(!args[0]) {
                const requireArgs0 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription('You must mention a user to mute!')

                message.channel.send(requireArgs0)
            } else {
                if(target) {
                    let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                    let memberTarget = message.guild.members.cache.get(target.id);
                    const userMutedBy = new Discord.MessageEmbed()
                        .setColor('#ffff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User mute')
                        .setDescription(`<@${memberTarget.user.id}> was muted by <@${message.member.user.id}>`)
                        .setFooter(`To unmute a member, execute "%unmute <@user>".`)
                    const userMutedForBy = new Discord.MessageEmbed()
                        .setColor('#ffff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User mute')
                        .setDescription(`<@${memberTarget.user.id}> was muted for ` + args[1] + ` by <@${message.member.user.id}>`)
                        .setFooter(`To unmute a member, execute "%unmute <@user>".`)
                    const userUnmutedFromTimedMuteBy = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User unmuted from timed mute')
                        .setDescription(`<@${memberTarget.user.id}> was unmuted from the ` + args[1] + ` timed mute by <@${message.member.user.id}>`)
                        .setFooter(`To mute a member, execute "%mute <@user> (<duration>)".`)
                    const errorPermissionsTooLow = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`<@${memberTarget.user.id}> has an equal or higher role than <@${message.member.user.id}>`)
                    const errorTargetImmune = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`<@${memberTarget.user.id}> is immune to this command!`)
                    const targetAlreadyMuted = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`<@${memberTarget.user.id}> is already muted!`)

                    if(message.member == memberTarget) {
                        const cannotUseOnSelf = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                            .setDescription('You cannot use this command on yourself!')

                        message.channel.send(cannotUseOnSelf)
                    } else {
                        if(memberTarget.roles.cache.find(role => role.name == 'Muted')) {
                            message.channel.send(targetAlreadyMuted)
                        } else {
                            if(message.member.roles.cache.find(role => role.name === 'BotPL0')) {   //message.member
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                                    message.channel.send(errorTargetImmune);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                                    message.channel.send(errorPermissionsTooLow);
                                } else {
                                    try {
                                        if(!args[1]) {
                                            memberTarget.roles.add(muteRole.id)
                                            message.channel.send(userMutedBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                            return;
                                        }
                                        memberTarget.roles.add(muteRole.id)
                                        message.channel.send(userMutedForBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id)
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#800080')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught at line 94:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')) {    //message.member
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                                    message.channel.send(errorTargetImmune);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                                    message.channel.send(errorPermissionsTooLow);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                                    message.channel.send(errorPermissionsTooLow);
                                } else {
                                    try {
                                        if(!args[1]) {
                                            memberTarget.roles.add(muteRole.id)
                                            message.channel.send(userMutedBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                            return;
                                        }
                                        memberTarget.roles.add(muteRole.id)
                                        message.channel.send(userMutedForBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id)
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#800080')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught on line 129:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            }
                            else if(message.member.roles.cache.find(role => role.name === 'BotPL2')) {  //message.member
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                                    message.channel.send(errorTargetImmune);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                                    message.channel.send(errorPermissionsTooLow);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                                    message.channel.send(errorPermissionsTooLow);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) {  //memberTarget
                                    message.channel.send(errorPermissionsTooLow)
                                } else {
                                    try {
                                        if(!args[1]) {
                                            memberTarget.roles.add(muteRole.id)
                                            message.channel.send(userMutedBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                            return;
                                        }
                                        memberTarget.roles.add(muteRole.id)
                                        message.channel.send(userMutedForBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id)
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#800080')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught on line 167:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            } else if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {    //message.member
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                                    message.channel.send(errorTargetImmune)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                                    message.channel.send(errorPermissionsTooLow)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                                    message.channel.send(errorPermissionsTooLow)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) {  //memberTarget
                                    message.channel.send(errorPermissionsTooLow)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL3')) {  //memberTarget
                                    message.channel.send(errorPermissionsTooLow)
                                } else {
                                    try {
                                        if(!args[1]) {
                                            memberTarget.roles.add(muteRole.id)
                                            message.channel.send(userMutedBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                            return;
                                        }
                                        memberTarget.roles.add(muteRole.id)
                                        message.channel.send(userMutedForBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id)
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#800080')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught on line 206:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            } else {
                                try {
                                    if(!args[1]) {
                                        memberTarget.roles.add(muteRole.id)
                                        message.channel.send(userMutedBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                        return;
                                    }
                                    memberTarget.roles.add(muteRole.id)
                                    message.channel.send(userMutedForBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)

                                    setTimeout(function () {
                                        memberTarget.roles.remove(muteRole.id);
                                        message.channel.send(userUnmutedFromTimedMuteBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                                    }, ms(args[1]));
                                } catch(error) {
                                    const errorCatch = new Discord.MessageEmbed()
                                        .setColor('#800080')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught on line 234:35\nmessage.content = ${message.content}`)

                                    message.channel.send(errorCatch)
                                }
                            }
                        }
                    }
                } else {    //if(target)    @19:17
                    const errorTarget = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription('Unknown user')

                    message.channel.send(errorTarget)
                }
            }
        } else {
            const errorNoPermissions = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(errorNoPermissions)
        }
    }
}
