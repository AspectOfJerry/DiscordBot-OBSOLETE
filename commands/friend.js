module.exports = {
    name: 'friend',
    aliases: ['f'],
    cooldown: 3,
    description: 'Usage: "%friend <add/remove> <@user>"',
    execute(message, args, cmd, client, Discord){
        if(message.member.user.id === '611633988515266562'){
            const target = message.mentions.users.first();

            let friendRole = message.guild.roles.cache.get('877984769793744896');

            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription("Invalid command! You must **add** or **remove** a user! Correct usage: %friend <add/remove> <@user>.")
                .setFooter(`message.content = ${message.content}\n%friend <args[0]> <args[1]>\n                  ^`)

            if(!args[0]) return message.reply(requireArgs0);

            if(args[0] == "add"){
                const memberTarget = message.guild.members.cache.get(target.id);
                if(!args[1]){
                    const requireArgs1 = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Error')
                        .setDescription("Invalid command! You must mention a user! Correct usage: %friend <add/remove> <@user>.")
                        .setFooter(`message.content = ${message.content}\n%friend <args[0]> <args[1]>\n                                       ^`)

                    message.channel.send(requireArgs1)
                }
                else{
                    if(target){
                        if(memberTarget.roles.cache.has('877984769793744896')){
                            const alreadyFriends = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setDescription(`You are already friends with <@${memberTarget.user.id}>`)
    
                            message.channel.send(alreadyFriends)
                        }
                        else{
                            memberTarget.roles.add(friendRole.id).catch(console.error)
                            const addedFriend = new Discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setDescription(`You are now friends with <@${memberTarget.user.id}>!`)
    
                            message.channel.send(addedFriend)
                        }
                    }
                    else{
                        const invalidTarget = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('Error')
                            .setDescription('The targeted member is invalid!')
                            .setFooter(`message.content = ${message.content}`)

                        message.channel.send(invalidTarget)
                    }
                }
            }
            else if(args[0] == "remove"){
                const memberTarget = message.guild.members.cache.get(target.id);
                if(!args[1]){
                    const requireArgs1 = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Error')
                        .setDescription("Invalid command! You must mention a user!")
                        .setFooter(`message.content = ${message.content}\n%friend <args[0]> <args[1]>\n                                       ^`)

                    message.channel.send(requireArgs1)
                }
                else{
                    if(target){
                        if(!memberTarget.roles.cache.get('877984769793744896')){
                            const notFriends = new Discord.MessageEmbed()

                            .setColor('#ff0000')
                            .setDescription(`You are not friends with <@${memberTarget.user.id}>`)
    
                            message.channel.send(notFriends)
                        }
                        else{
                            memberTarget.roles.remove(friendRole.id).catch(console.error)

                            const removedFriend = new Discord.MessageEmbed()
                            .setColor('#00ff00')
                            .setDescription(`You removed <@${memberTarget.user.id}> from your friends!`)
    
                            message.channel.send(removedFriend)
                        }
                    }
                    else{
                        const targetError = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Error 0x56B(1387)')
                        .setDescription('The targeted member is invalid!')
                        .setFooter(`message.content = ${message.content}\n%friend <args[0]> <args[1]>\n                                       ^\n1387(0x56B) ERROR_NO_SUCH_MEMBER`)
                        
                        message.channel.send(targetError)
                    }
                }
            }
            else{
                const requireAddOrRemove = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Error')
                .setDescription("Invalid command! You must **add** or **remove** a user! Correct usage: %friend <add/remove> <@user>.")
                .setFooter(`message.content = ${message.content}\n%friend <args[0]> <args[1]>\n                  ^`)

                message.channel.send(requireAddOrRemove)
            }
        }
        else{
            const notImplementedForAll = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error 501')
            .setDescription('The "%friend <add/remove> <@user>" command is currently **only** available to the server **owner**!')
            .setFooter('501 NOT_IMPLEMENTED')

            message.channel.send(notImplementedForAll)
        }        
    }
}