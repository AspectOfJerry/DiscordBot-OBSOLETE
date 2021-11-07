module.exports = {
    name: 'friend',
    aliases: ['f'],
    description: 'Usage: "%friend <add/remove> <@user>"',
    execute(message, args, cmd, client, Discord) {
        if(message.member.user.id == '611633988515266562') {    //user.id of "@Jerry#3756"
            const target = message.mentions.users.first();
            let friendRole = message.guild.roles.cache.get('877984769793744896');
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You must **add** or **remove** a user")
                .setFooter(`%friend "<args[0]>" <args[1]>`)

            if(!args[0]) return message.reply(requireArgs0);

            if(args[0].toUpperCase() == "ADD") {
                const memberTarget = message.guild.members.cache.get(target.id);
                if(!args[1]) {
                    const requireArgs1 = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription("You must mention a user")
                        .setFooter(`%friend <args[0]> "<args[1]>"`)

                    message.channel.send(requireArgs1)
                } else {
                    if(target) {
                        if(memberTarget.roles.cache.has('877984769793744896')) { //'Friend' role.id
                            const alreadyFriends = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                                .setDescription(`You are already friends with <@${memberTarget.user.id}>`)

                            message.channel.send(alreadyFriends)
                        } else {
                            memberTarget.roles.add(friendRole.id).catch(console.error)  //Give add role
                            const addedFriend = new Discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                                .setDescription(`You are now friends with <@${memberTarget.user.id}>!`)

                            message.channel.send(addedFriend)
                        }
                    } else {
                        const targetError = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                            .setTitle('Error')
                            .setDescription('The targeted member is invalid')
                            .setFooter(`%friend <args[0]> "<args[1]>"`)

                        message.channel.send(targetError)
                    }
                }
            } else if(args[0].toUpperCase() == "REMOVE") {
                const memberTarget = message.guild.members.cache.get(target.id);
                if(!args[1]) {
                    const requireArgs1 = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription("You must mention a user")
                        .setFooter(`%friend <args[0]> "<args[1]>"`)

                    message.channel.send(requireArgs1)
                } else {
                    if(target) {
                        if(!memberTarget.roles.cache.get('877984769793744896')) {    //If memberTarget does not have the 'Friends' role
                            const notFriends = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                                .setDescription(`You are not friends with <@${memberTarget.user.id}>`)

                            message.channel.send(notFriends)
                        } else {
                            memberTarget.roles.remove(friendRole.id).catch(console.error)

                            const removedFriend = new Discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                                .setDescription(`You removed <@${memberTarget.user.id}> from your friends!`)

                            message.channel.send(removedFriend)
                        }
                    } else {
                        const targetError = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                            .setTitle('Error')
                            .setDescription('The targeted member is invalid!')
                            .setFooter(`%friend <args[0]> "<args[1]>"`)

                        message.channel.send(targetError)
                    }
                }
            } else {    //else if(args[0].toUpperCase() == "REMOVE")    @58:15
                const requireAddOrRemove = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error')
                    .setDescription("You must **add** or **remove** a user!")
                    .setFooter(`%friend <args[0]> <args[1]>\n                  ^requireAddOrRemove`)

                message.channel.send(requireAddOrRemove)
            }
        } else {    //if(message.member.user.id == '611633988515266562')    @6:9
            const notImplementedForAll = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription('The %friend command is only available to the server owner!')

            message.channel.send(notImplementedForAll)
        }
    }
}
