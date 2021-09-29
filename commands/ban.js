module.exports = {
    name: 'ban',
    description: "Usage: %ban <@user>",
    execute(message, args, cmd, client, Discord) {
        if(message.member.roles.cache.get('890076942164983808')) {    //If 'message.member' has the role 'moderator goldfish'
            const target = message.mentions.users.first();
            if(!args[0]) {
                const requireArgs0 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error')
                    .setDescription('You must mention a member')

                message.channel.send(requireArgs0)
            } else {
                if(target) {    //If 'target' is valid
                    const memberTarget = message.guild.members.cache.get(target.id);
                    const userBannedBy = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User ban')
                        .setDescription(`<@${memberTarget.user.id}> was banned from the guild by <@${message.member.user.id}>`)
                        .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 64})}`)
                        .setFooter(`To unban a member, go to "Server Settings" > "Bans" > "Revoke Ban".`)
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

                    if(memberTarget == message.member) { //If 'memberTarget' is equal to 'message.member'
                        const cannotUseOnSelf = new Discord.MessageEmbed()
                            .setColor('#800080')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                            .setTitle('Error')
                            .setDescription('You cannot use this command on yourself!')

                        message.channel.send(cannotUseOnSelf);
                    } else {
                        if(message.member.roles.cache.has('890075267517784116')) {    //If 'message.member' has the role 'overlord goldfish'
                            if(memberTarget.roles.cache.find(role => role.name.includes('bot'))) {    //If 'memberTarget' has a role that includes "bot"
                                message.channel.send(targetImmune403);
                            } else if(memberTarget.roles.cache.has('890075267517784116')) { //If 'memberTarget' has the role 'overlord goldfish'
                                message.channel.send(targetHigherThanSender403)
                            } else {
                                try {    //Try to ban 'memberTarget'
                                    memberTarget.ban().catch(console.error);    //Ban 'memberTarget'

                                    message.channel.send(userBannedBy)
                                    message.guild.channels.cache.get('890067108287873094').send(userBannedBy)
                                } catch(error) { //Catch
                                    const errorBan = new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 57:35\nmessage.content = ${message.content}`)

                                    message.channel.send(errorBan)
                                }
                            }
                        } else if(message.member.roles.cache.has('890076599926521916')) {   //If 'message.member' has the role 'admin goldfish'
                            if(memberTarget.roles.cache.find(role => role.name.includes('bot'))) {    //If 'memberTarget' has a role that contains "bot"
                                message.channel.send(targetImmune403)
                            } else if(memberTarget.roles.cache.has('890075267517784116')) { //If 'memberTarget' has the role 'overlord goldfish'
                                message.channel.send(targetHigherThanSender403)
                            } else if(memberTarget.roles.cache.has('890076599926521916')) { //If 'memberTarget' has the role 'admin goldfish'
                                message.channel.send(targetHigherThanSender403)
                            } else {
                                try {
                                    memberTarget.ban().catch(console.error);    //Ban 'memberTarget'

                                    message.channel.send(userBannedBy)
                                    message.guild.channels.cache.get('890067108287873094').send(userBannedBy)
                                } catch(error) {
                                    const errorBan = new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 81:35\nmessage.content = ${message.content}`)

                                    message.channel.send(errorBan)
                                }
                            }
                        } else if(message.member.roles.cache.has('890076942164983808')) {
                            if(memberTarget.roles.cache.find(role => role.name.includes('bot'))) {  //If 'memberTarget' has a role that contains "bot"
                                message.channel.send(targetImmune403)
                            } else if(memberTarget.roles.cache.has('890075267517784116')) { //If 'memberTarget' has the role 'overlord goldfish'
                                message.channel.send(targetHigherThanSender403)
                            } else if(memberTarget.roles.cache.has('890076599926521916')) { //If 'memberTarget' has the role 'admin goldfish'
                                message.channel.send(targetHigherThanSender403)
                            } else if(memberTarget.role.cache.has('890076942164983808')) {  //If 'memberTarget' has the role 'moderator goldfish'
                                message.channel.send(targetHigherThanSender403)
                            } else {
                                try {
                                    memberTarget.ban().catch(console.error);    //Ban 'memberTarget'

                                    message.channel.send(userBannedBy)
                                    message.guild.channels.cache.get('890067108287873094').send(userBannedBy)
                                } catch(error) {
                                    const errorBan = new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 107:35\nmessage.content = ${message.content}`)

                                    message.channel.send(errorBan)
                                }
                            }
                        } else {
                            try {
                                memberTarget.ban().catch(console.error);    //Ban 'memberTarget'

                                message.channel.send(userBannedBy)
                                message.guild.channels.cache.get('890067108287873094').send(userBannedBy)
                            } catch(error) {
                                const errorBan = new Discord.MessageEmbed()
                                    .setColor('#ff0000')
                                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                    .setTitle('Error Catch')
                                    .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                                    .setFooter(`An error was caught at line 124:31\nmessage.content = ${message.content}`)

                                message.channel.send(errorBan)
                            }
                        }
                    }
                } else {
                    const targetError = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription('The targeted member is invalid')

                    message.channel.send(targetError)
                }
            }
        } else {   //If 'message.member' does not have the role 'moderator goldfish'
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}