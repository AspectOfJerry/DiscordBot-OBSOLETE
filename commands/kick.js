module.exports = {
    name: 'kick',
    aliases: ['cassetoi', 'casse_toi', 'casse-toi'],
    cooldown: 10,
    description: "Usage: %kick <@user>",
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.find(role => role.name === 'BotPL2')){    //If 'message.member' has the role 'BotPL2'
            const target = message.mentions.users.first();
            if(!args[0]){
                const requireArgs0 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('You must mention a member')
                    .setFooter(`%kick <args[0]>\n              ^`)

                message.channel.send(requireArgs0)
            } else{
                if(target){ //If 'target' is valid
                    const memberTarget = message.guild.members.cache.get(target.id);
                    const userKickedBy = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('User kick')
                        .setDescription(`<@${memberTarget.user.id}> was kicked from the guild by <@${message.member.user.id}>`)
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
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){ //If 'memberTarget, has the role 'BotPL0'
                                message.channel.send(targetHigherThanSender403);
                            } else{
                                try{
                                    memberTarget.kick().catch(console.error);   //Kick 'memberTarget'
    
                                    message.channel.send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                                } catch(error){
                                    const errorKick = new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 52\nmessage.content = ${message.content}`)
        
                                    message.channel.send(errorKick)
                                }
                            }
                        } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')){   //If 'message.member' has the role 'BotPL1'
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')){    //If 'memberTarget' has the role 'Bots'
                                message.channel.send(targetImmune403);
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){ //If 'memberTarget' has the role 'BotPL0'
                                message.channel.send(targetHigherThanSender403);
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){ //If 'memberTarget' has the role 'BotPL1'
                                message.channel.send(targetHigherThanSender403);
                            } else{
                                try{
                                    memberTarget.kick().catch(console.error);   //Kick 'memberTarget'
    
                                    message.channel.send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                                } catch(error){
                                    const errorKick = new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 76\nmessage.content = ${message.content}`)
        
                                    message.channel.send(errorKick)
                                }
                            }
                        } else if(message.member.roles.cache.find(role => role.name === 'BotPL2')){ //If 'message.member' has the role 'BotPL2'
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')){    //If 'memberTarget' has the role 'Bots'
                                message.channel.send(targetImmune403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){ //If 'memberTarget' has the role 'BotPL0'
                                message.channel.send(targetHigherThanSender403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){ //If 'memberTarget' has the role 'BotPL1'
                                message.channel.send(targetHigherThanSender403)
                            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')){ //If 'memberTarget' has the role 'BotPL2'
                                message.channel.send(targetHigherThanSender403)
                            } else{
                                try{
                                    memberTarget.kick().catch(console.error);   //Kick 'memberTarget'
    
                                    message.channel.send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                                } catch(error){
                                    const errorKick = new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught at line 102\nmessage.content = ${message.content}`)
        
                                    message.channel.send(errorKick)
                                }
                            }
                        } else{
                            try{
                                memberTarget.kick().catch(console.error);   //Kick 'memberTarget'
    
                                message.channel.send(userKickedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                            } catch(error){
                                const errorKick = new Discord.MessageEmbed()
                                    .setColor('#ff0000')
                                    .setTitle('Error Catch')
                                    .setDescription(`An error occured while trying to kick <@${memberTarget.user.id}>`)
                                    .setFooter(`An error was caught at line 119\nmessage.content = ${message.content}`)
    
                                message.channel.send(errorKick)
                            }
                        }
                    }
                } else{
                    const targetError = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Error')
                        .setDescription('The targeted member is invalid')
                        .setFooter(`%kick <args[0]>\n              ^`)
                    
                    message.channel.send(targetError)
                }
            }
        } else{   //If 'message.member' does not have the 'BotPL2'
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}