module.exports = {
    name: 'ban',
    cooldown: 10,
    description: "Usage: %ban <@user>",
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.find(role => role.name === 'BotPL1')){    //If 'message.member' has the role 'BotPL1'
            const target = message.mentions.users.first();
            if(!args[0]){
                const requireArgs0 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('You must mention a member')
                    .setFooter(`%ban <args[0]>\n              ^requireArgs0`)

                message.channel.send(requireArgs0)
            } else{
                if(target){     //If 'target' is valid
                    const memberTarget = message.guild.members.cache.get(target.id);
                    const userBannedBy = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('User ban')
                        .setDescription(`<@${memberTarget.user.id}> was banned from the guild by <@${message.member.user.id}>`)
                        .setFooter(`To unban a member, go to "Server Settings" > "Bans" > "Revoke Ban"`)
                    const targetHigherThanSender403 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Permissions error')
                        .setDescription(`<@${memberTarget.user.id}> has an equal or higher role than <@${message.member.user.id}>`)
                    const targetImmune403 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Permissions error')
                        .setDescription(`<@${memberTarget.user.id}> is immune to this command!`)
                
                    if(memberTarget == message.member){ //If 'memberTarget' is equal to 'message.member'
                        const cannotUseOnSelf = new Discord.MessageEmbed()
                            .setColor('#800080')
                            .setTitle('Error')
                            .setDescription('You cannot use this command on yourself!')
    
                        message.channel.send(cannotUseOnSelf);
                    } else{
                        if(message.member.roles.cache.find(role => role.name === 'BotPL0')){    //If 'message.member' has the role 'BotPL0'
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')){    //If 'memberTarget' has the role 'Bots'
                                message.channel.send(targetImmune403);
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){ //If 'memberTarget' has the role 'BotPL0'
                                message.channel.send(targetHigherThanSender403)
                            } else{
                                try{    //Try to ban 'memberTarget'
                                    memberTarget.ban().catch(console.error);    //Ban 'memberTarget'
    
                                    message.channel.send(userBannedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userBannedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userBannedBy)
                                } catch(error){ //Catch
                                    const errorBan = new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 53\nmessage.content = ${message.content}`)
    
                                    message.channel.send(errorBan)
                                }
                            }
                        } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')){   //If 'message.member' has the role 'BotPL1'
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')){    //If 'memberTarget' has the role 'Bots'
                                message.channel.send(targetImmune403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){ //If 'memberTarget' has the role 'BotPL0'
                                message.channel.send(targetHigherThanSender403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){ //If 'memberTarget' has the role 'BotPL1'
                                message.channel.send(targetHigherThanSender403)
                            } else{
                                try{
                                    memberTarget.ban().catch(console.error);    //Ban 'memberTarget'
    
                                    message.channel.send(userBannedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userBannedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userBannedBy)
                                }catch(error){
                                    const errorBan = new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 77\nmessage.content = ${message.content}`)
    
                                    message.channel.send(errorBan)
                                }
                            }
                        } else{
                            try{
                                memberTarget.ban().catch(console.error);    //Ban 'memberTarget'
        
                                message.channel.send(userBannedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userBannedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userBannedBy)
                            } catch(error){
                                const errorBan = new Discord.MessageEmbed()
                                    .setColor('#ff0000')
                                    .setTitle('Error Catch')
                                    .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                                    .setFooter(`An error was caught at line 94\nmessage.content = ${message.content}`)
    
                                message.channel.send(errorBan)
                            }
                        }
                    }
                } else{
                    const targetError = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('The targeted member is invalid')
                    .setFooter(`%ban <args[0]>\n              ^targetError`)
                    
                    message.channel.send(targetError)
                }
            }
        } else{   //If 'message.member' does not have the role 'BotPL1'
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}