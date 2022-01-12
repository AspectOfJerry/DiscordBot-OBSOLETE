module.exports = {
    name: 'kick',
    aliases: ['cassetoi', 'casse-toi', 'casse_toi', 'wolacassetoi', 'wola-casse-toi', 'wola_casse_toi'],
    description: "Usage: %kick <@user>",
    execute(message, args, cmd, client, Discord) {
        if(message.member.roles.cache.find(role => role.name === 'BotPR2')) {
            const target = message.mentions.users.first()
            if(!args[0]) {
                const requireArgs0 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription('You must mention a member to kick!')

                message.channel.send(requireArgs0)
            } else {
                if(target) {
                    const memberTarget = message.guild.members.cache.get(target.id);
                    const userKickedBy = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User kick')
                        .setDescription(`<@${memberTarget.user.id}> was kicked from the guild by <@${message.member.user.id}>`)
                    const targetHigherThanSender403 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
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

                        message.channel.send(cannotUseOnSelf)
                    } else {
                        if(message.member.roles.cache.find(role => role.name === 'BotPR0')) {
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {
                                message.channel.send(targetImmune403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPR0')) {
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
                        } else if(message.member.roles.cache.find(role => role.name === 'BotPR1')) {    //message.member
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //membertarget
                                message.channel.send(targetImmune403);
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPR0')) {  //membertarget
                                message.channel.send(targetHigherThanSender403);
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPR1')) {  //membertarget
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
                        } else if(message.member.roles.cache.find(role => role.name === 'BotPR2')) {    //Message.member
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //membertarget
                                message.channel.send(targetImmune403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPR0')) {  //membertarget
                                message.channel.send(targetHigherThanSender403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPR1')) {  //membertarget
                                message.channel.send(targetHigherThanSender403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPR2')) {  //membertarget
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
                    }   //else  @44:23
                } else {    //if(target)    @18:17
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
