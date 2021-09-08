module.exports = {
    name: 'ban',
    cooldown: 10,
    description: "Usage: %ban <@user>",
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.find(role => role.name === 'BotPL1')){   //RoleID for "BotP R1"
            const target = message.mentions.users.first();

            if(target){     //Checks if the target is present
                const memberTarget = message.guild.members.cache.get(target.id);

                const userBannedBy = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('User ban')
                    .setDescription(`<@${memberTarget.user.id}> was **banned** from the guild by <@${message.member.user.id}>!`)
                    .setFooter(`To unban a member, go to "Server Settings" > "Bans" > Click on the user > "Revoke Ban".\nmessage.content = ${message.content}`)

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
                
                if(memberTarget == message.member){     //Checks if the targeted member is equal to the sender
                    const cannotUseOnSelf = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setTitle('Error')
                        .setDescription('You **cannot** use this command on **yourself**!')
                        .setFooter(`message.content = ${message.content}`)

                    message.channel.send(cannotUseOnSelf);
                }
                else{
                    if(message.member.roles.cache.find(role => role.name === 'BotPL0')){   //Checks if the sender has the "BotPL0" role
                        if(memberTarget.roles.cache.find(role => role.name === 'Bots')){     //Checks if the target has the "Bots" roles
                            message.channel.send(targetImmune403);
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){     //Checks if the target has the "BotPL0" role
                            message.channel.send(targetHigherThanSender403)
                        }
                        else{
                            memberTarget.ban().catch(console.error);    //Ban the targeted member

                            message.channel.send(userBannedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userBannedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userBannedBy)
                        }
                    }
                    else if(message.member.roles.cache.find(role => role.name === 'BotPL1')){
                        if(memberTarget.roles.cache.find(role => role.name === 'Bots')){
                            message.channel.send(targetImmune403)
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')){
                            message.channel.send(targetHigherThanSender403)
                        }
                        else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')){
                            message.channel.send(targetHigherThanSender403)
                        }
                        else{
                            memberTarget.ban().catch(console.error);    //Ban the targeted member

                            message.channel.send(userBannedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userBannedBy)
                            message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userBannedBy)
                        }
                    }
                    else{
                        memberTarget.ban().catch(console.error);    //Ban the targeted member

                        message.channel.send(userBannedBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userBannedBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userBannedBy)
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