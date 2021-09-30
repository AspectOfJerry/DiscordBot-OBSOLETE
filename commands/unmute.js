module.exports = {
    name: 'unmute',
    aliases: ['un-mute', 'un_mute'],
    description: 'Usage: "%unmute <@user>"',
    execute(message, args, cmd, client, Discord) {
        if(message.member.roles.cache.has('890077443090706473')) {    //If 'message.member' has the role 'helper goldfish'
            const target = message.mentions.users.first();
            if(!args[0]) {
                const requireArgs0 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error')
                    .setDescription('You must mention a member to unmute!')

                message.channel.send(requireArgs0)
            } else {
                if(target) { //If 'target' is valid
                    let muteRole = message.guild.roles.cache.has('');
                    let memberTarget = message.guild.members.cache.get(target.id);
                    const userUnmutedBy = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User unmute')
                        .setDescription(`<@${memberTarget.user.id}> was unmuted by <@${message.member.user.id}>`)
                        .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 64})}`)
                        .setFooter(`To mute a member, execute "%mute <@user> (<duration>)"`)
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
                    const userNotMuted = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription(`<@${memberTarget.user.id}> is not muted!`)
                    if(message.member == memberTarget) { //If 'message.member' is equal to 'memberTarget'
                        const cannotUseOnSelf = new Discord.MessageEmbed()
                            .setColor('#800080')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                            .setTitle('Error')
                            .setDescription('You cannot use this command on yourself!')

                        message.channel.send(cannotUseOnSelf)
                    } else {
                        if(!memberTarget.roles.cache.find(role => role.name === 'Muted')) {
                            message.channel.send(userNotMuted)
                        } else {
                            if(message.member.roles.cache.has('890075267517784116')) {    //If 'message.member' has the role 'overlord goldfish'
                                if(memberTarget.roles.cache.find(role => role.name === 'bot')) {    //If 'memberTarget' has a role that contains "bot"
                                    message.channel.send(targetImmune403);
                                } else if(memberTarget.roles.cache.has('890075267517784116')) { //If 'memberTarget' has the role 'overlord goldfish'
                                    message.channel.send(targetHigherThanSender403);
                                } else {
                                    try {
                                        memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'

                                        message.channel.send(userUnmutedBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                                    } catch(error) {
                                        const errorUnmute = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to unmute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught at line 60\nmessage.content = ${message.content}`)

                                        message.channel.send(errorUnmute)
                                    }
                                }
                            } else if(message.member.roles.cache.has('890076599926521916')) {   //If 'message.member' has the role 'admin goldfish'
                                if(memberTarget.roles.cache.find(role => role.name === 'bot')) {    //If 'memberTarget' has a role that contains "bot"
                                    message.channel.send(targetImmune403);
                                } else if(memberTarget.roles.cache.has('890075267517784116')) { //If 'memberTarget' has the role 'overlord goldfish'
                                    message.channel.send(targetHigherThanSender403);
                                } else if(memberTarget.roles.cache.has('890076599926521916')) { //If 'memberTarget' has the role 'admin goldfish'
                                    message.channel.send(targetHigherThanSender403);
                                } else {
                                    try {
                                        memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'

                                        message.channel.send(userUnmutedBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                                    } catch(error) {
                                        const errorUnmute = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught at line 83\nmessage.content = ${message.content}`)

                                        message.channel.send(errorUnmute)
                                    }
                                }
                            } else if(message.member.roles.cache.has('890076942164983808')) {   //If 'message.member' has the role 'moderator goldfish'
                                if(memberTarget.roles.cache.find(role => role.name === 'bot')) {    //If 'memberTarget' has a role that contains "bot"
                                    message.channel.send(targetImmune403)
                                } else if(memberTarget.roles.cache.has('890075267517784116')) {    //If 'memberTarget' has the role 'overlord goldfish'
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.has('890076599926521916')) { //If 'memberTarget' has the role 'admin goldfish'
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.has('890076942164983808')) { //If 'memberTarget' has the role 'moderator goldfish'
                                    message.channel.send(targetHigherThanSender403)
                                } else {
                                    try {
                                        memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'

                                        message.channel.send(userUnmutedBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                                    } catch(error) {
                                        const errorUnmute = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught at line 108\nmessage.content = ${message.content}`)

                                        message.channel.send(errorUnmute)
                                    }
                                }
                            } else if(message.member.roles.cache.find(role => role.name === '')) {   //If 'message.member' has the role 'BotPL3'
                                if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {    //If 'memberTarget' has a role that contains "bot"
                                    message.channel.send(targetImmune403)
                                } else if(memberTarget.roles.cache.has('890075267517784116')) { //If 'memberTarget' has the role 'overlord goldfish'
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) { //If 'memberTarget' has the role 'BotPL1'
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) { //If 'memberTarget' has the role 'BotPL2'
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL3')) { //If 'memberTarget' has the role 'BotPL3'
                                    message.channel.send(targetHigherThanSender403)
                                } else {
                                    try {
                                        memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'

                                        message.channel.send(userUnmutedBy)
                                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                                    } catch(error) {
                                        const errorUnmute = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught at line 135\nmessage.content = ${message.content}`)

                                        message.channel.send(errorUnmute)
                                    }
                                }
                            } else {
                                try {
                                    memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'

                                    message.channel.send(userUnmutedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                                } catch(error) {
                                    const errorUnmute = new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error')
                                        .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 151\nmessage.content = ${message.content}`)

                                    message.channel.send(errorUnmute)
                                }
                            }
                        }
                    }
                } else {
                    const targetError = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription('The targeted member is invalid!')
                        .setFooter(`%unmute <args[0]>\n                      ^targetError`)

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