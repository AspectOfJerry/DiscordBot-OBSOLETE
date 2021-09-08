module.exports = {
    name: 'kick',
    aliases: ['cassetoi', 'casse_toi', 'casse-toi'],
    cooldown: 10,
    description: "Usage: %kick <@user>",
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.find(role => role.name === 'BotPL2')){   //RoleID for "BotPL2"

            const target = message.mentions.users.first();

            if(target){ //Checks if the target is present
                const memberTarget = message.guild.members.cache.get(target.id);

                const userKickedBy = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('User kick')
                    .setDescription(`<@${memberTarget.user.id}> was **kicked** from the guild by <@${message.member.user.id}>!`)
                    .setFooter(`message.content = ${message.content}`)

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

                if(memberTarget == message.member){ //Checks if the targeted member is equal to the sender

                    const cannotUseOnSelf = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setTitle('Error')
                        .setDescription('You **cannot** use this command on **yourself**!')
                        .setFooter(`message.content = ${message.content}`)

                    message.channel.send(cannotUseOnSelf);
                }
                else{
                    if(message.member.roles.cache.find(role => role.name === 'BotPL0')){   //Checks if the sender has the "BotPL0" role
                        if(memberTarget.roles.cache.find(role => role.name === 'Bots')){ //Checks if the target has the "Bots" roles
                            message.channel.send(targetImmune403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){    //Checks if the target has the "Moderator" role
                            message.channel.send(targetHigherThanSender403);
                        }
                        else{
                            memberTarget.kick().catch(console.error);   //Kick the targeted member
                            message.channel.send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                        }
                    }
                    else if(message.member.roles.cache.find(role => role.name === 'BotPL1')){  //Checks if the sender has the "BotPL1" role
                        if(memberTarget.roles.cache.find(role => role.name === 'Bots')){ //Checks if the target has the "Bots" roles
                            message.channel.send(targetImmune403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){    //Chechks if the target has the "BotPL2" role
                            message.channel.send(targetHigherThanSender403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){    //Chechks if the target has the "BotPL1" role
                            message.channel.send(targetHigherThanSender403);
                        }
                        else{
                            memberTarget.kick().catch(console.error);   //Kick the targeted member
                            message.channel.send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                        }
                    }
                    else if(message.member.roles.find(role => role.name === 'BotPL2')){
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
                        else{
                            memberTarget.kick().catch(console.error);   //Kick the targeted member
                            message.channel.send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                        }
                    }
                    else{
                        memberTarget.kick().catch(console.error);   //Kick the targeted
                        message.channel.send(userKickedBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                    }
                }
            }
            else{
                const targetError = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('The targeted member is invalid!')
                    .setFooter(`message.content = ${message.content}\n%kick <args[0]>\n              ^`)
                
                message.channel.send(targetError)
            }
        }
        else{   //If the sender does not have the role "Administrator" or higher
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do **not** have the **permissions** to perform this command. Please contact the server administrators if you believe that this is an error.")
                .setFooter(`message.content = ${message.content}`)

            message.channel.send(permissionsError)
        }
    }
}