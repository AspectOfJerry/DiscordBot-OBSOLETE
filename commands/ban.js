module.exports = {
    name: 'ban',
    cooldown: 10,
    description: "Usage: %ban <@user>",
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.has('869709691679289354')){   //RoleID for "BotP R1"
            const target = message.mentions.users.first();

            if(target){     //Checks if the target is present
                const memberTarget = message.guild.members.cache.get(target.id);

                const userBannedBy = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('User ban')
                .setDescription(`<@${memberTarget.user.id}> was **banned** from the __guild__ by <@${message.member.user.id}>!`)
                .setFooter(`To unban a member, go to "Server Settings" > "Bans".\nmessage.content = ${message.content}`)

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
                
                if(memberTarget == message.member){     //Checks if the targeted member is equal to the sender
                    const cannotUseOnSelf = new Discord.MessageEmbed()
                    .setColor('#800080')
                    .setTitle('Error')
                    .setDescription('You **cannot** use this __command__ on **yourself**!')
                    .setFooter(`message.content = ${message.content}`)

                    message.channel.send(cannotUseOnSelf);
                }
                else{
                    if(message.member.roles.cache.has('642107004076163103')){   //Checks if the sender has the "Administrator" role
                        if(memberTarget.roles.cache.has(targetImmune403)){     //Checks if the target has the "Bots" roles
                            message.channel.send('Could not perform the command (403)! The targeted member is immune to this command.');
                        }
                        else if(memberTarget.roles.cache.has('642107004076163103')){     //Checks if the target has the "Administrator" role
                            message.channel.send(targetHigherThanSender403)
                        }
                        else if(memberTarget.roles.cache.has('697914535863910561')){    //Checks if the target has the "Owner" role
                            message.channel.send(targetHigherThanSender403)
                        }
                        else{
                            memberTarget.ban().catch(console.error);    //Ban the targeted member

                            message.channel.send(userBannedBy)
                            message.guild.channels.cache.get('874419074535415848').send(userBannedBy)
                            message.guild.channels.cache.get('857850833982193665').send(userBannedBy)
                        }
                    }
                    else{
                        memberTarget.ban().catch(console.error);    //Ban the targeted member

                        message.channel.send(userBannedBy)
                        message.guild.channels.cache.get('874419074535415848').send(userBannedBy)
                        message.guild.channels.cache.get('857850833982193665').send(userBannedBy)
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
            .setDescription("I'm sorry but you do **not** have the __permissions__ to **perform** this __command__. Please contact the server administrators if you believe that this is an error.")
            .setFooter(`message.content = ${message.content}`)

            message.channel.send(permissionsError)
        }
    }
}