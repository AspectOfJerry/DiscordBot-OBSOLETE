module.exports = {
    name: 'mute',
    aliases: ['tempmute', 'temp_mute'],
    cooldown: 10,
    description: 'Usage: "%mute <@user> (<duration s/m/y>)"',
    execute(message, args, cmd, client, Discord){

        const ms = require(`ms`)
        if(message.member.roles.cache.has('869995421794193518')){   //RoleID for "BotP R3"
            const target = message.mentions.users.first();
            if(target){
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    
                let memberTarget = message.guild.members.cache.get(target.id);

                const userMutedBy = new Discord.MessageEmbed()
                .setColor('#ffff00')
                .setTitle('User mute: "' + message.content + '"')
                .setDescription(`<@${memberTarget.user.id}> was **muted** by <@${message.member.user.id}>!`)
                .setFooter('200 OK')

                const userMutedForBy = new Discord.MessageEmbed()
                .setColor('#ffff00')
                .setTitle('User mute: "' + message.content + '"')
                .setDescription(`<@${memberTarget.user.id}> was muted for ` + args[1] + ` by <@${message.member.user.id}>`)
                .setFooter('200 OK')
                
                const userUnmutedFromTimedMuteBy = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('User unmuted from timed mute')
                .setDescription(`<@${memberTarget.user.id}> was unmuted from the ` + args[1] + ` timed mute by <@${message.member.user.id}>`)
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
                
                if(message.member == memberTarget){
                    const cannotUseOnSelf = new Discord.MessageEmbed()
                    .setColor('#800080')
                    .setTitle('Error 403: "' + message.content + '"')
                    .setDescription('You **cannot** use this __command__ on **yourself**!')
                    .setFooter('403 FORBIDDEN')

                    message.channel.send(cannotUseOnSelf);
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
                        else{   //Does the mute procedure to the targeted member
                            if(!args[1]){   //Checks if the command does not have a first argument
                                memberTarget.roles.add(muteRole.id);
                                message.channel.send(userMutedBy)
                                message.guild.channels.cache.get('874419074535415848').send(userMutedBy)
                                return;
                            }   //If the command contains a first argument
                            memberTarget.roles.add(muteRole.id);
                            message.channel.send(userMutedForBy)
                            message.guild.channels.cache.get('874419074535415848').send(userMutedForBy)
            
                            setTimeout(function () {
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedFromTimedMuteBy)
                                message.guild.channels.cache.get('874419074535415848').send(userUnmutedFromTimedMuteBy)
                            }, ms(args[1]));
                        }
                    }   //If the message sender does not have the "Staff" role
                    else if(message.member.roles.cache.has('631943246095974400')){  //Checks if the message sender has the "Moderator" role
                        if(memberTarget.roles.cache.has('798556730459422730')){     //Checks if the target has the "Bots" roles
                            message.channel.send(targetImmune403);
                        }
                        else if(memberTarget.roles.cache.has('631943246095974400')){   //Checks if the target has the "Moderator" role
                            message.channel.send(targetHigherThanSender403);
                        }
                        else if(memberTarget.roles.cache.has('642107004076163103')){    //Checks if the target has the "Administrator" role
                            message.channel.send(targetHigherThanSender403);
                        }
                        else if(memberTarget.roles.cache.has('697914535863910561')){    //Checks is the target has the "Owner" role
                            message.channel.send(targetHigherThanSender403);
                        }
                        else{   //Does the mute procedure to the targeted member
                            if(!args[1]){   //Checks if the command does not have a first argument
                                memberTarget.roles.add(muteRole.id);
                                message.channel.send(userMutedBy)
                                message.guild.channels.cache.get('874419074535415848').send(userMutedBy)
                                return;
                            }   //If the command contains a first argument
                            memberTarget.roles.add(muteRole.id);
                            message.channel.send(userMutedForBy)
                            message.guild.channels.cache.get('874419074535415848').send(userMutedForBy)
            
                            setTimeout(function () {
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedFromTimedMuteBy)
                                message.guild.channels.cache.get('874419074535415848').send(userUnmutedFromTimedMuteBy)
                            }, ms(args[1]));
                        }
                    }   //If the message sender does not have the "Moderator" role
                    else if(message.member.roles.cache.has('642107004076163103')){  //Checks if the message sender has the "Administrator" role
                        if(memberTarget.roles.cache.has('798556730459422730')){     //Checks if the target has the "Bots" roles
                            message.channel.send(targetImmune403);
                        }
                        else if(memberTarget.roles.cache.has('642107004076163103')){
                            message.channel.send(targetHigherThanSender403);
                        }
                        else if(memberTarget.roles.cache.has('697914535863910561')){
                            message.channel.send(targetHigherThanSender403);
                        }
                        else{   //Does the mute command to the targeted member
                            if(!args[1]){   //Checks if the command does not have a first argument
                                memberTarget.roles.add(muteRole.id);
                                message.channel.send(userMutedBy)
                                message.guild.channels.cache.get('874419074535415848').send(userMutedBy)
                                return;
                            }   //If the command contains a first argument
                            memberTarget.roles.add(muteRole.id);
                            message.channel.send(userMutedForBy)
                            message.guild.channels.cache.get('874419074535415848').send(userMutedForBy)
            
                            setTimeout(function () {
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedFromTimedMuteBy)
                                message.guild.channels.cache.get('874419074535415848').send(userUnmutedFromTimedMuteBy)
                            }, ms(args[1]));
                        }
                    }   //If the message sender does not have the "Administrator" role
                    else{   //Does the mute command to the targeted member
                        if(!args[1]){   //Checks if the command does not have a first argument
                            memberTarget.roles.add(muteRole.id);
                            message.channel.send(userMutedBy)
                            message.guild.channels.cache.get('874419074535415848').send(userMutedBy)
                            return;
                        }   //If the command contains a first argument
                        memberTarget.roles.add(muteRole.id);
                        message.channel.send(userMutedForBy)
                        message.guild.channels.cache.get('874419074535415848').send(userMutedForBy)
        
                        setTimeout(function () {
                            memberTarget.roles.remove(muteRole.id);
                            message.channel.send(userUnmutedFromTimedMuteBy)
                            message.guild.channels.cache.get('874419074535415848').send(userUnmutedFromTimedMuteBy)
                        }, ms(args[1]));
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