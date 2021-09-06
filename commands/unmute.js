const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'unmute',
    cooldown: 10,
    description: 'Usage: "%unmute <@user>"',
    execute(message, args, cmd, client, Discord){

        message.channel.send('This feature is temporarily down'); return;
        if(message.member.roles.cache.has('869995421794193518')){
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
                    .setDescription(`<@${memberTarget.user.id}> __has__ an **equal** or **higher** role __than__ <@${message.member.user.id}>.`)
                    .setFooter(`message.content = ${message.content}`)

                const targetImmune403 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Permissions error')
                    .setDescription(`<@${memberTarget.user.id}> is **immune** to this command!`)
                    .setFooter(`message.content = ${message.content}`)

                const userNotMuted = new Discord.MessageEmbed()
                    .setColor('#800080')
                    .setTitle('Error')
                    .setDescription('Could **not** perform the __command__! The **target** is **not** __muted__!')
                    .setFooter(`message.content = ${message.content}`)

                if(message.member == memberTarget){
                    const cannotUseOnSelf = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setTitle('Error')
                        .setDescription('You **cannot** use this __command__ on **yourself**!')
                        .setFooter(`message.content = ${message.content}`)

                    message.channel.send(cannotUseOnSelf)
                }
                else{
                    if(!memberTarget.roles.cache.find(role => role.name === 'Muted')){
                        message.channel.send(userNotMuted);
                    }
                    else{
                        if(message.member.roles.cache.has('802349057112670278')){   //Checks if the message sender has the "Staff" role
                            if(memberTarget.roles.cache.has('798556730459422730')){     //Checks if the target has the "Bots" roles
                                message.channel.send(targetImmune403);
                            }
                            else if(memberTarget.roles.cache.has('802349057112670278')){   //Checks if the target has the "Staff" role
                                message.channel.send(targetHigherThanSender403);
                            }
                            else if(memberTarget.roles.cache.has('631943246095974400')){    //Checks if the target has the "Moderator" role
                                message.channel.send(targetHigherThanSender403);
                            }
                            else if(memberTarget.roles.cache.has('642107004076163103')){    //Checks if the target has the "Administrator" role
                                message.channel.send(targetHigherThanSender403);
                            }
                            else if(memberTarget.roles.cache.has('697914535863910561')){    //Checks if the target has the "Owner" role
                                message.channel.send(targetHigherThanSender403);
                            }
                            else{
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedBy)
                                message.guild.channels.cache.get(userUnmutedBy)
                            }
                        }
                        else if(message.member.roles.cache.has('631943246095974400')){  //Checks if the target has the "Moderator" role
                            if(memberTarget.roles.cache.has('798556730459422730')){     //Checks if the target has the "Bots" roles
                                message.channel.send(targetImmune403);
                            }
                            else if(memberTarget.roles.cache.has('631943246095974400')){    //Checks if the target has the "Moderator" role
                                message.channel.send(targetHigherThanSender403);
                            }
                            else if(memberTarget.roles.cache.has('642107004076163103')){    //Checks if the target has the "Administrator" role
                                message.channel.send(targetHigherThanSender403);
                            }
                            else if(memberTarget.roles.cache.has('697914535863910561')){    //Checks if the target has the "Owner" role
                                message.channel.send(targetHigherThanSender403);
                            }
                            else{
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedBy)
                                message.guild.channels.cache.get(userUnmutedBy)
                            }
                        }
                        else{
                            memberTarget.roles.remove(muteRole.id);
                            message.channel.send(userUnmutedBy)
                            message.guild.channels.cache.get(userUnmutedBy)
                        }
                    }
                }
            }
            else{
                const targetError = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('The targeted member is invalid!')
                    .setFooter(`message.content = ${message.content}`)
                
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