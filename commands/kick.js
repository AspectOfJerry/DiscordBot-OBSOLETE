module.exports = {
    name: 'kick',
    cooldown: 10,
    description: "Usage: %kick <@user>",
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.has('869995231049818143')){   //RoleID for "BotP R2"

            const target = message.mentions.users.first();

            if(target){     //Checks if the target is present
                const memberTarget = message.guild.members.cache.get(target.id);

                const userKickedBy = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('User kick: "' + message.content + '"')
                .setDescription(`<@${memberTarget.user.id}> was **kicked** from the __guild__ by <@${message.member.user.id}>!`)
                .setFooter('200 OK')

                const targetHigherThanSender403 = new Discord.MessageEmbed()
                .setColor('#800080')
                .setTitle('Error 403: "' + message.content + '"')
                .setDescription('Could **not** perform the __command__! The **target** __has__ an **equal** or **higher** role __than__ the **sender**.')
                .setFooter('403 FORBIDDEN')

                const targetImmune403 = new Discord.MessageEmbed()
                .setColor('#800080')
                .setTitle('Error 403: "' + message.content + '"')
                .setDescription('Could **not** perform the __command__! The **target** is **immune** to this command')
                .setFooter('403 FORBIDDEN')

                if(memberTarget == message.member){     //Checks if the targeted member is equal to the sender

                    const cannotUseOnSelf = new Discord.MessageEmbed()
                    .setColor('#800080')
                    .setTitle('Error 403: "' + message.content + '"')
                    .setDescription('You **cannot** use this __command__ on **yourself**!')
                    .setFooter('403 FORBIDDEN')

                    message.channel.send(cannotUseOnSelf);
                }
                else{
                    if(message.member.roles.cache.has('631943246095974400')){   //Checks if the sender has the "Moderator" role
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
                            memberTarget.kick().catch(console.error);    //Kick the targeted member
                            message.channel.send(userKickedBy)
                            message.guild.channels.cache.get('874419074535415848').send(userKickedBy)
                            message.guild.channels.cache.get('857850833982193665').send(userKickedBy)
                        }
                    }
                    else if(message.member.roles.cache.has('642107004076163103')){   //Checks if the sender has the "Administrator" role
                        if(memberTarget.roles.cache.has('798556730459422730')){     //Checks if the target has the "Bots" roles
                            message.channel.send(targetImmune403);
                        }
                        else if(memberTarget.roles.cache.has('642107004076163103')){     //Chechks if the target has the "Administrator" role
                            message.channel.send(targetHigherThanSender403);
                        }
                        else if(memberTarget.roles.cache.has('697914535863910561')){     //Chechks if the target has the "Owner" role
                            message.channel.send(targetHigherThanSender403);
                        }
                        else{
                            memberTarget.kick().catch(console.error);    //Kick the targeted member
                            message.channel.send(userKickedBy)
                            message.guild.channels.cache.get('874419074535415848').send(userKickedBy)
                            message.guild.channels.cache.get('857850833982193665').send(userKickedBy)
                        }
                    }
                    else{
                        memberTarget.kick().catch(console.error);    //Kick the targeted member
                        message.channel.send(userKickedBy)
                        message.guild.channels.cache.get('874419074535415848').send(userKickedBy)
                        message.guild.channels.cache.get('857850833982193665').send(userKickedBy)
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
        else{   //If the sender does not have the role "Administrator" or higher
            const permissionsTooLow = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Error 403: "' + message.content + '"')
            .setDescription("I'm sorry but you do **not** have the __permissions__ to **perform** this __command__. Please contact the server administrators if you believe that this is an error.")
            .setFooter('403 FORBIDDEN')

            message.channel.send(permissionsTooLow)
        }
    }
}