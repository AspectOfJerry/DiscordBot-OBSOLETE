module.exports = {
    name: 'mute',
    aliases: ['tempmute', 'temp-mute', 'temp_mute'],
    cooldown: 10,
    description: 'Usage: "%mute <@user> (<duration s/m/y>)"',
    execute(message, args, cmd, client, Discord){

        const ms = require(`ms`)
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')){   //RoleID for "BotPL3"
            const target = message.mentions.users.first();
            if(target){
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    
                let memberTarget = message.guild.members.cache.get(target.id);

                const userMutedBy = new Discord.MessageEmbed()
                    .setColor('#ffff00')
                    .setTitle('User mute')
                    .setDescription(`<@${memberTarget.user.id}> was **muted** by <@${message.member.user.id}>!`)
                    .setFooter(`To unmute a member, execute "%unmute <@user>".\nmessage.content = ${message.content}`)

                const userMutedForBy = new Discord.MessageEmbed()
                    .setColor('#ffff00')
                    .setTitle('User mute')
                    .setDescription(`<@${memberTarget.user.id}> was muted for ` + args[1] + ` by <@${message.member.user.id}>`)
                    .setFooter(`message.content = ${message.content}`)
                
                const userUnmutedFromTimedMuteBy = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('User unmuted from timed mute')
                    .setDescription(`<@${memberTarget.user.id}> was unmuted from the ` + args[1] + ` timed mute by <@${message.member.user.id}>`)
                    .setFooter(`To mute a member, execute "%mute <@user> (<duration>)".`)
                
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
                
                if(message.member == memberTarget){
                    const cannotUseOnSelf = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setTitle('Error')
                        .setDescription('You **cannot** use this __command__ on **yourself**!')
                        .setFooter(`message.content = ${message.content}`)

                    message.channel.send(cannotUseOnSelf)
                }
                else{
                    if(message.member.roles.cache.find(role => role.name === 'BotPL0')){   //Checks if the message sender has the "BotPL0" role
                        if(memberTarget.roles.cache.find(role => role.name === 'Bots')){     //Checks if the target has the "Bots" roles
                            message.channel.send(targetImmune403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){   //Checks if the target has the "BotPl0" role
                            message.channel.send(targetHigherThanSender403);
                        }
                        else{   //Does the mute procedure to the targeted member
                            if(!args[1]){   //Checks if the command does not have a first argument
                                memberTarget.roles.add(muteRole.id);
                                message.channel.send(userMutedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                return;
                            }   //If the command contains a first argument
                            memberTarget.roles.add(muteRole.id);
                            message.channel.send(userMutedForBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
            
                            setTimeout(function () {
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedFromTimedMuteBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                            }, ms(args[1]));
                        }
                    }   //If the message sender does not have the "BotPl0" role
                    else if(message.member.roles.cache.find(role => role.name === 'BotPL1')){  //Checks if the message sender has the "BotPL1" role
                        if(memberTarget.roles.cache.find(role => role.name === 'Bots')){     //Checks if the target has the "Bots" roles
                            message.channel.send(targetImmune403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){   //Checks if the target has the "Moderator" role
                            message.channel.send(targetHigherThanSender403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){    //Checks if the target has the "Administrator" role
                            message.channel.send(targetHigherThanSender403);
                        }
                        else{   //Does the mute procedure to the targeted member
                            if(!args[1]){   //Checks if the command does not have a first argument
                                memberTarget.roles.add(muteRole.id);
                                message.channel.send(userMutedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                return;
                            }   //If the command contains a first argument
                            memberTarget.roles.add(muteRole.id);
                            message.channel.send(userMutedForBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)
            
                            setTimeout(function () {
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedFromTimedMuteBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                            }, ms(args[1]));
                        }
                    }   //If the message sender does not have the "BotPL1" role
                    else if(message.member.roles.cache.find(role => role.name === 'BotPL2')){  //Checks if the message sender has the "BotPL2" role
                        if(memberTarget.roles.cache.find(role => role.name === 'Bots')){     //Checks if the target has the "Bots" roles
                            message.channel.send(targetImmune403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){
                            message.channel.send(targetHigherThanSender403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){
                            message.channel.send(targetHigherThanSender403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')){
                            message.channel.send(targetHigherThanSender403)
                        }
                        else{   //Does the mute command to the targeted member
                            if(!args[1]){   //Checks if the command does not have a first argument
                                memberTarget.roles.add(muteRole.id);
                                message.channel.send(userMutedBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                                return;
                            }   //If the command contains a first argument
                            memberTarget.roles.add(muteRole.id);
                            message.channel.send(userMutedForBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)
            
                            setTimeout(function () {
                                memberTarget.roles.remove(muteRole.id);
                                message.channel.send(userUnmutedFromTimedMuteBy)
                                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                            }, ms(args[1]));
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
                    }
                    else{   //Does the mute command to the targeted member
                        if(!args[1]){   //Checks if the command does not have a first argument
                            memberTarget.roles.add(muteRole.id);
                            message.channel.send(userMutedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy)
                            return;
                        }   //If the command contains a first argument
                        memberTarget.roles.add(muteRole.id);
                        message.channel.send(userMutedForBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy)
        
                        setTimeout(function () {
                            memberTarget.roles.remove(muteRole.id);
                            message.channel.send(userUnmutedFromTimedMuteBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy)
                        }, ms(args[1]));
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
                .setDescription("I'm sorry but you do **not** have the __permissions__ to **perform** this __command__. Please contact the server administrators if you believe that this is an error.")
                .setFooter(`message.content = ${message.content}`)

            message.channel.send(permissionsError)
        }
    }
}