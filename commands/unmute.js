const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'unmute',
    cooldown: 10,
    description: 'Usage: "%unmute <@user>"',
    execute(message, args, cmd, client, Discord){

        if(message.member.roles.cache.find(role => role.name === 'BotPL3')){
            const target = message.mentions.users.first();
            if(target){
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    
                let memberTarget = message.guild.members.cache.get(target.id);
    
                const userUnmutedBy = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('User unmute')
                    .setDescription(`<@${memberTarget.user.id}> was **unmuted** by <@${message.member.user.id}>!`)
                    .setFooter(`To mute a member, execute "%mute <@user> (<duration>)".\nmessage.content = ${message.content}`)

                const targetHigherThanSender403 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Permissions error')
                    .setDescription(`<@${memberTarget.user.id}> has an **equal** or **higher** role than <@${message.member.user.id}>.`)
                    .setFooter(`message.content = ${message.content}`)

                const targetImmune403 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Permissions error')
                    .setDescription(`<@${memberTarget.user.id}> is **immune** to this command!`)
                    .setFooter(`message.content = ${message.content}`)

                const userNotMuted = new Discord.MessageEmbed()
                    .setColor('#800080')
                    .setTitle('Error')
                    .setDescription('Could **not** perform the command! The **target** is **not** muted!')
                    .setFooter(`message.content = ${message.content}`)

                if(message.member == memberTarget){
                    const cannotUseOnSelf = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setTitle('Error')
                        .setDescription('You **cannot** use this command on **yourself**!')
                        .setFooter(`message.content = ${message.content}`)

                    message.channel.send(cannotUseOnSelf)
                }
                else{
                    if(!memberTarget.roles.cache.find(role => role.name === 'Muted')){
                        message.channel.send(userNotMuted);
                    }
                    else{
                        if(message.member.roles.cache.find(role => role.name === 'BotPL0')){   //Checks if the message sender has the "BotPL0" role
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')){     //Checks if the target has the "Bots" roles
                                message.channel.send(targetImmune403);
                            }
                            else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){   //Checks if the target has the "BotPL0" role
                                message.channel.send(targetHigherThanSender403);
                            }
                            else{
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                            }
                        }
                        else if(message.member.roles.cache.find(role => role.name === 'BotPL1')){  //Checks if the sender has the "BotPL1" role
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')){     //Checks if the target has the "Bots" roles
                                message.channel.send(targetImmune403);
                            }
                            else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){    //Checks if the target has the "BotPL0" role
                                message.channel.send(targetHigherThanSender403);
                            }
                            else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){    //Checks if the target has the "BotPL1" role
                                message.channel.send(targetHigherThanSender403);
                            }
                            else{
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                            }
                        }
                        else if(message.member.roles.cache.find(role => role.name === 'BotPL2')){
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')){
                                message.channel.send(targetImmune403)
                            }
                            else if(memberTarget.roles.cache.find(role => role.name === 'BotsPL0')){
                                message.channel.send(targetHigherThanSender403)
                            }
                            else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){
                                message.channel.send(targetHigherThanSender403)
                            }
                            else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')){
                                message.channel.send(targetHigherThanSender403)
                            }
                            else{
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                            }
                        }
                        else if(message.member.roles.cache.find(role => role.name === 'BotPL3')){
                            if(memberTarget.roles.cache.find(role => role.name === 'Bots')){
                                message.channel.send(targetImmune403)
                            }
                            else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){
                                message.channel.send(targetHigherThanSender403)
                            }
                            else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){
                                message.channel.send(targetHigherThanSender403)
                            }
                            else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')){
                                message.channel.send(targetHigherThanSender403)
                            }
                            else if(memberTarget.roles.cache.find(role => role.name === 'BotPL3')){
                                message.channel.send(targetHigherThanSender403)
                            }
                            else{
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                            }
                        }
                        else{
                            memberTarget.roles.remove(muteRole.id);
                            message.channel.send(userUnmutedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedBy)
                        }
                    }
                }
            }
            else{
                const targetError = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('The targeted member is invalid!')
                    .setFooter(`message.content = ${message.content}\n%unmute <args[0]>\n                      ^`)
                
                message.channel.send(targetError)
            }
        }
        else{
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do **not** have the **permissions** to perform this command. Please contact the server administrators if you believe that this is an error.")
                .setFooter(`message.content = ${message.content}`)

            message.channel.send(permissionsError)
        }
    }
}