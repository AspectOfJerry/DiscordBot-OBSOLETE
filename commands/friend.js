module.exports = {
    name: 'friend',
    aliases: ['f'],
    cooldown: 3,
    description: 'Usage: "%friend <add/remove> <@user>"',
    execute(message, args, cmd, client, Discord){
        if(message.member.user.id === '611633988515266562'){    //If 'message.member' has the 'user.id' of "@Jerry#3756"
            const target = message.mentions.users.first();
            let friendRole = message.guild.roles.cache.get('877984769793744896');
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription("You must **add** or **remove** a user")
                .setFooter(`%friend <args[0]> <args[1]>\n                  ^requireArgs0`)

            if(!args[0]) return message.reply(requireArgs0);    //If 'args[0]' is not present

            if(args[0].toUpperCase() == "ADD"){   //If 'args[0]' to upper case is equal to "ADD"
                const memberTarget = message.guild.members.cache.get(target.id);
                if(!args[1]){   //If 'args[1]' is not present
                    const requireArgs1 = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Error')
                        .setDescription("You must mention a user")
                        .setFooter(`%friend <args[0]> <args[1]>\n                                       ^requireArgs1`)

                    message.channel.send(requireArgs1)
                } else{
                    if(target){ //If 'target' is valid
                        if(memberTarget.roles.cache.has('877984769793744896')){ //If 'memberTarget' has the role 'Friends'
                            const alreadyFriends = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setDescription(`You are already friends with <@${memberTarget.user.id}>`)
    
                            message.channel.send(alreadyFriends)
                        } else{   //If 'memberTarget' does not have the role 'Friends'
                            memberTarget.roles.add(friendRole.id).catch(console.error)  //Give memberTarget the role 'Friends'
                            const addedFriend = new Discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setDescription(`You are now friends with <@${memberTarget.user.id}>!`)
    
                            message.channel.send(addedFriend)
                        }
                    } else{
                        const targetError = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('Error')
                            .setDescription('The targeted member is invalid')
                            .setFooter(`%friend <args[0]> <args[1]>\n                                       ^targetErro`)

                        message.channel.send(targetError)
                    }
                }
            } else if(args[0].toUpperCase() == "REMOVE"){ //If args[0] to upper case is equal to "REMOVE"
                const memberTarget = message.guild.members.cache.get(target.id);
                if(!args[1]){   //If args[1] is not present
                    const requireArgs1 = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Error')
                        .setDescription("You must mention a user")
                        .setFooter(`%friend <args[0]> <args[1]>\n                                       ^requireArgs1`)

                    message.channel.send(requireArgs1)
                } else{
                    if(target){ //If target is valid
                        if(!memberTarget.roles.cache.get('877984769793744896')){    //If memberTarget does not have the 'Friends' role
                            const notFriends = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setDescription(`You are not friends with <@${memberTarget.user.id}>`)
    
                            message.channel.send(notFriends)
                        } else{
                            memberTarget.roles.remove(friendRole.id).catch(console.error)

                            const removedFriend = new Discord.MessageEmbed()
                            .setColor('#00ff00')
                            .setDescription(`You removed <@${memberTarget.user.id}> from your friends!`)
    
                            message.channel.send(removedFriend)
                        }
                    } else{
                        const targetError = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Error')
                        .setDescription('The targeted member is invalid!')
                        .setFooter(`%friend <args[0]> <args[1]>\n                                       ^targetError`)
                        
                        message.channel.send(targetError)
                    }
                }
            } else{   //If args[0] to upper case does not contain "ADD" nor "REMOVE"
                const requireAddOrRemove = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Error')
                .setDescription("You must **add** or **remove** a user!")
                .setFooter(`%friend <args[0]> <args[1]>\n                  ^requireAddOrRemove`)

                message.channel.send(requireAddOrRemove)
            }
        } else{
            const notImplementedForAll = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('The %friend command is only available to the server owner!')

            message.channel.send(notImplementedForAll)
        }        
    }
}