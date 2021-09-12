module.exports = {
    name: 'kick',
    aliases: ['cassetoi', 'casse_toi', 'casse-toi'],
    cooldown: 10,
    description: "Usage: %kick <@user>",
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.find(role => role.name === 'BotPL2')){    //If 'message.member' has the role 'BotPL2'

            const target = message.mentions.users.first();

            if(target){ //If 'target' is valid
                const memberTarget = message.guild.members.cache.get(target.id);

                const userKickedBy = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('User kick')
                    .setDescription(`<@${memberTarget.user.id}> was **kicked** from the guild by <@${message.member.user.id}>!`)
                    .setFooter(`message.content = ${message.content}`)

                const targetHigherThanSender403 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Permissions error 0x5(5)')
                    .setDescription(`<@${memberTarget.user.id}> has an **equal** or **higher** role than <@${message.member.user.id}>.`)
                    .setFooter(`message.content = ${message.content}\n5(0x5) ERROR_ACCESS_DENIED`)

                const targetImmune403 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Permissions error 0x5(5)')
                    .setDescription(`<@${memberTarget.user.id}> is **immune** to this command!`)
                    .setFooter(`message.content = ${message.content}\n5(0x5) ERROR_ACCESS_DENIED`)

                if(memberTarget == message.member){ //If 'memberTarget' is equal to 'message.member'

                    const cannotUseOnSelf = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setTitle('Error')
                        .setDescription('You **cannot** use this command on **yourself**!')
                        .setFooter(`message.content = ${message.content}`)

                    message.channel.send(cannotUseOnSelf);
                }
                else{
                    if(message.member.roles.cache.find(role => role.name === 'BotPL0')){    //If 'message.member' has the role 'BotPL0'
                        if(memberTarget.roles.cache.find(role => role.name === 'Bots')){    //If 'memberTarget' has the role 'Bots'
                            message.channel.send(targetImmune403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){ //If 'memberTarget, has the role 'BotPL0'
                            message.channel.send(targetHigherThanSender403);
                        }
                        else{
                            memberTarget.kick().catch(console.error);   //Kick 'memberTarget'
                            message.channel.send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                        }
                    }
                    else if(message.member.roles.cache.find(role => role.name === 'BotPL1')){   //If 'message.member' has the role 'BotPL1'
                        if(memberTarget.roles.cache.find(role => role.name === 'Bots')){    //If 'memberTarget' has the role 'Bots'
                            message.channel.send(targetImmune403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){ //If 'memberTarget' has the role 'BotPL0'
                            message.channel.send(targetHigherThanSender403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){ //If 'memberTarget' has the role 'BotPL1'
                            message.channel.send(targetHigherThanSender403);
                        }
                        else{
                            memberTarget.kick().catch(console.error);   //Kick 'memberTarget'
                            message.channel.send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                        }
                    }
                    else if(message.member.roles.find(role => role.name === 'BotPL2')){ //If 'message.member' has the role 'BotPL2'
                        if(memberTarget.roles.cache.find(role => role.name === 'Bots')){    //If 'memberTarget' has the role 'Bots'
                            message.channel.send(targetImmune403)
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){ //If 'memberTarget' has the role 'BotPL0'
                            message.channel.send(targetHigherThanSender403)
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){ //If 'memberTarget' has the role 'BotPL1'
                            message.channel.send(targetHigherThanSender403)
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')){ //If 'memberTarget' has the role 'BotPL2'
                            message.channel.send(targetHigherThanSender403)
                        }
                        else{
                            memberTarget.kick().catch(console.error);   //Kick 'memberTarget'
                            message.channel.send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                        }
                    }
                    else{
                        memberTarget.kick().catch(console.error);   //Kick 'memberTarget'
                        message.channel.send(userKickedBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                    }
                }
            }
            else{
                const targetError = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error 0x56B(1387)')
                    .setDescription('The targeted member is invalid!')
                    .setFooter(`message.content = ${message.content}\n%kick <args[0]>\n              ^\n1387(0x56B) ERROR_NO_SUCH_MEMBER`)
                
                message.channel.send(targetError)
            }
        }
        else{   //If 'message.member' does not have the 'BotPL2'
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permissions error 0x5(5)')
                .setDescription("I'm sorry but you do **not** have the **permissions** to perform this command. Please contact the server administrators if you believe that this is an error.")
                .setFooter(`message.content = ${message.content}\n5(0x5) ERROR_ACCESS_DENIED`)

            message.channel.send(permissionsError)
        }
    }
}