const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'unmute',
    cooldown: 10,
    description: 'Usage: "%unmute <@user>"',
    execute(message, args, cmd, client, Discord){

        if(message.member.roles.cache.has('869995421794193518')){
            const target = message.mentions.users.first();
            if(target){
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    
                let memberTarget = message.guild.members.cache.get(target.id);
    
                const userUnmutedBy = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('User unmute: "' + message.content + '"')
                .setDescription(`<@${memberTarget.user.id}> was **unmuted** by <@${message.member.user.id}>!`)
                .setFooter('200 OK')

                const targetHigherThanSender403 = new Discord.MessageEmbed()
                .setColor('#800080')
                .setTitle('Error 403: "' + message.content + '"')
                .setDescription('Could **not** perform the __command__! The **target** __has__ an **equal** or **higher** role __than__ the **sender**.')
                .setFooter('403 FORBIDDEN_')

                const targetImmune403 = new Discord.MessageEmbed()
                .setColor('#800080')
                .setTitle('Error 403: "' + message.content + '"')
                .setDescription('Could **not** perform the __command__! The **target** is **immune** to this command')
                .setFooter('403 FORBIDDEN')

                const userNotMuted = new Discord.MessageEmbed()
                .setColor('#800080')
                .setTitle('Error: "' + message.content + '"')
                .setDescription('Could **not** perform the __command__! The **target** is **not** __muted__!')

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
            else{
                const targetError = new Discord.MessageEmbed()
                .setColor('#800080')
                .setTitle('Error 449: "' + message.content + '"')
                .setDescription('Invalid command! You **must** __mention__ a member. Correct usage: %kick <@user>.')
                .setFooter('449 RETRY_WITH')

                message.channel.send(targetError)
            }
        }
        else{
            const permissionsTooLow = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Error 403: "' + message.content + '"')
            .setDescription("I'm sorry but you do **not** have the __permissions__ to **perform** this __command__. Please contact the server administrators if you believe that this is an error.")
            .setFooter('403 FORBIDDEN')

            message.channel.send(permissionsTooLow)
        }
    }
}