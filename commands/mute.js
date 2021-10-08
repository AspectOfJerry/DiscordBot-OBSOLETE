module.exports = {
    name: 'mute',
    aliases: ['tempmute', 'temp-mute', 'temp_mute'],
    description: 'Usage: "%mute <@user> (<duration s/m/y>)"',
    execute(message, args, cmd, client, Discord) {
        const ms = require(`ms`)
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {    //If 'message.member' has the role 'BotPL3'
            const target = message.mentions.users.first();
            if(!args[0]) {
                const requireArgs0 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error')
                    .setDescription('You must mention a member')
                    .setFooter(`%mute <args[0]> (<args[1]>)\n                 ^requireArgs0`)

                message.channel.send(requireArgs0)
            } else {
                if(target) { //If 'target' is valid
                    let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                    let memberTarget = message.guild.members.cache.get(target.id);
                    const userMutedBy = new Discord.MessageEmbed()
                        .setColor('#ffff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User mute')
                        .setDescription(`<@${memberTarget.user.id}> was muted by <@${message.member.user.id}>`)
                        .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 64})}`)
                        .setFooter(`To unmute a member, execute "%unmute <@user>".`)
                    const userMutedForBy = new Discord.MessageEmbed()
                        .setColor('#ffff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User mute')
                        .setDescription(`<@${memberTarget.user.id}> was muted for ` + args[1] + ` by <@${message.member.user.id}>`)
                        .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 64})}`)
                        .setFooter(`To unmute a member, execute "%unmute <@user>".`)
                    const userUnmutedFromTimedMuteBy = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User unmuted from timed mute')
                        .setDescription(`<@${memberTarget.user.id}> was unmuted from the ` + args[1] + ` timed mute by <@${message.member.user.id}>`)
                        .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 64})}`)
                        .setFooter(`To mute a member, execute "%mute <@user> (<duration>)".`)
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
                    const targetAlreadyMuted = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription(`<@${memberTarget.user.id}> is already muted!`)

                    if(message.member == memberTarget) { //If 'message.member' is equal to 'memberTarget'
                        const cannotUseOnSelf = new Discord.MessageEmbed()
                            .setColor('#800080')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                            .setTitle('Error')
                            .setDescription('You cannot use this command on yourself!')

                        message.channel.send(cannotUseOnSelf)
                    } else {
                        if(memberTarget.roles.cache.find(role => role.name == 'Muted')) {    //If 'memberTarget' has the role 'Muted'
                            message.channel.send(targetAlreadyMuted)
                        } else {
                            if(message.member.roles.cache.find(role => role.name === 'BotPL0')) {    //If 'message.member' has the role 'BotPL0'
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {    //If 'memberTarget' has the role 'Bots'
                                    message.channel.send(targetImmune403);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) { //If 'memberTarget' has the role 'BotPL0'
                                    message.channel.send(targetHigherThanSender403);
                                } else {
                                    try {
                                        if(!args[1]) {   //If 'args[1]' is not present
                                            memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                            message.channel.send(userMutedBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                            return;
                                        }   //If 'args[1]' is present
                                        memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                        message.channel.send(userMutedForBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught at line 94:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')) {   //If 'message.member' has the role 'BotPL1'
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {    //If 'memberTarget' has the role 'Bots'
                                    message.channel.send(targetImmune403);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) { //If 'memberTarget' has the role 'BotPL0'
                                    message.channel.send(targetHigherThanSender403);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) { //If 'memberTarget' has the role 'BotPL1'
                                    message.channel.send(targetHigherThanSender403);
                                } else {
                                    try {
                                        if(!args[1]) {   //If 'args[1]' is not present
                                            memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                            message.channel.send(userMutedBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                            return;
                                        }   //If 'args[1]' is present
                                        memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                        message.channel.send(userMutedForBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught on line 129:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            }   //If the message sender does not have the "BotPL1" role
                            else if(message.member.roles.cache.find(role => role.name === 'BotPL2')) {   //If 'message.member' has the role 'BotPL2'
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {    //If 'memberTarget' has the role 'Bots'
                                    message.channel.send(targetImmune403);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) { //If 'memberTarget' has the role 'BotPL0'
                                    message.channel.send(targetHigherThanSender403);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) { //If 'memberTarget' has the role 'BotPL1'
                                    message.channel.send(targetHigherThanSender403);
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) { //If 'memberTarget' has the role 'BotPl2'
                                    message.channel.send(targetHigherThanSender403)
                                } else {
                                    try {
                                        if(!args[1]) {   //If 'args[1]' is not present
                                            memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                            message.channel.send(userMutedBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                            return;
                                        }   //If 'args[1]' is present
                                        memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                        message.channel.send(userMutedForBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught on line 167:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            } else if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {   //if 'message.member' has the role 'BotPL3'
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {    //If 'memberTarget' has the role 'Bots'
                                    message.channel.send(targetImmune403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) { //If 'memberTarget' has the role 'BotPL0'
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) { //If 'memberTarget' has the role 'BotPL1'
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) { //If 'memberTarget' has the role 'BotPL2'
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL3')) { //If 'memberTarget' has the role 'BotPL3'
                                    message.channel.send(targetHigherThanSender403)
                                } else {
                                    try {
                                        if(!args[1]) {   //If 'args[1]' is not present
                                            memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                            message.channel.send(userMutedBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                            return;
                                        }   //If 'args[1]' is present
                                        memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                        message.channel.send(userMutedForBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorCatch = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught on line 206:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorCatch)
                                    }
                                }
                            } else {
                                try {
                                    if(!args[1]) {   //If 'args[1]' is not present
                                        memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                        message.channel.send(userMutedBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                        return;
                                    }   //If 'args[1]' is present
                                    memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                    message.channel.send(userMutedForBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)

                                    setTimeout(function () {
                                        memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'
                                        message.channel.send(userUnmutedFromTimedMuteBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                                    }, ms(args[1]));
                                } catch(error) {
                                    const errorCatch = new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught on line 234:35\nmessage.content = ${message.content}`)

                                    message.channel.send(errorCatch)
                                }
                            }
                        }
                    }
                } else {
                    const targetError = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription('The targeted member is invalid')
                        .setFooter(`%mute <args[0]> (<args[1]>)\n                 ^`)

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
//haha