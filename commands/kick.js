module.exports = {
    name: 'kick',
    description: "Usage: %kick <@user>",
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const HELP_COMMAND = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%kick command help (BotPL2)')
                .setDescription('This command kick the mentioned member form the guild.')
                .addField(`Usage`, "`%kick` `<@user>`", true)
                .addField("Stats for nerds", "Lines: `166`; File size: `~10.7` KB", false)
                .setFooter('This command is case-insensitive.')

            message.channel.send(HELP_COMMAND)
            return;
        }
        //Checks
        if(message.member.roles.cache.find(role => role.name === 'BotPL2')) {
            const ERROR_NO_PERMISSIONS = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(ERROR_NO_PERMISSIONS)
            return;
        }
        if(!args[0]) {
            const errorRequireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You must mention a member to kick!')

            message.channel.send(errorRequireArgs0)
            return;
        }
        const target = message.mentions.users.first()
        if(target) {
            const errorTarget = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('Unknown member')

            message.channel.send(errorTarget)
            return;
        }
        const memberTarget = message.guild.members.cache.get(target.id);
        if(memberTarget == message.member) {
            const ERROR_CANNOT_SELF = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You cannot use this command on yourself!')

            message.channel.send(ERROR_CANNOT_SELF)
            return;
        }
        //Declaring variables
        let kickConfirmation = true;

        const userKickedBy = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('User kick')
            .setDescription(`<@${memberTarget.user.id}> was kicked from the guild by <@${message.member.user.id}>`)
        const ERROR_PERMISSIONS_TOO_LOW = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`<@${memberTarget.user.id}> has an equal or higher role than <@${message.member.user.id}>`)
        const ERROR_TARGET_IMMUNE = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`<@${memberTarget.user.id}> is immune to this command!`)
        const REQUEST_ABORTED = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`Request aborted`)
        const REQUEST_TIMEOUT = new Discord.MessageEmbed()
            .setColor('#800080')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription("Request timeout")
        //Declaring functions
        function confirmKickFriend(message, args, cmd, client, Discord, memberTarget, REQUEST_ABORTED, REQUEST_TIMEOUT) {
            //Declaring variables
            const confirmKickFriend = new Discord.MessageEmbed()
                .setColor('ffff00')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription(`yes/no: Are you sure to kick <@${memberTarget.user.id}>? They are <@611633988515266562>'s friend.`)
                .setFooter('Request pending [10s]')
            //Code
            if(memberTarget.roles.cache.find(role => role.name == 'Friends')) {

                let filter = m => m.author.id === message.author.id

                message.channel.send(confirmKickFriend);

                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 10000,
                    errors: ['time']
                })
                    .then(message => {
                        message = message.first()
                        if(message.content.toUpperCase() == 'YES') {    //message.content
                            return (true);
                        } else {
                            message.channel.send(REQUEST_ABORTED);
                            return (false);
                        }
                    })
                    .catch(collected => {
                        message.channel.send(REQUEST_TIMEOUT);
                        return (false);
                    });
            } else {
                return (true);
            }
        }
        //Code
        if(message.member.roles.cache.find(role => role.name === 'BotPL0')) {

            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {
                message.channel.send(ERROR_TARGET_IMMUNE)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else {
                kickConfirmation = confirmKickFriend(message, args, cmd, client, Discord, memberTarget, REQUEST_ABORTED, REQUEST_TIMEOUT)

                if(kickConfirmation == true) {
                    memberTarget.kick().catch(console.error)

                    message.channel.send(userKickedBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                }
            }
        } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')) {    //message.member

            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //membertarget
                message.channel.send(ERROR_TARGET_IMMUNE);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //membertarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //membertarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else {
                kickConfirmation = confirmKickFriend(message, args, cmd, client, Discord, memberTarget, REQUEST_ABORTED, REQUEST_TIMEOUT);

                if(kickConfirmation == true) {
                    memberTarget.kick().catch(console.error);

                    message.channel.send(userKickedBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                }
            }
        } else if(message.member.roles.cache.find(role => role.name === 'BotPL2')) {    //Message.member

            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //membertarget
                message.channel.send(ERROR_TARGET_IMMUNE)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //membertarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //membertarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) {  //membertarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else {
                kickConfirmation = confirmKickFriend(message, args, cmd, client, Discord, memberTarget, REQUEST_ABORTED, REQUEST_TIMEOUT);

                if(kickConfirmation == true) {
                    memberTarget.kick().catch(console.error);

                    message.channel.send(userKickedBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
                }
            }
        } else {
            kickConfirmation = confirmKickFriend(message, args, cmd, client, Discord, memberTarget, REQUEST_ABORTED, REQUEST_TIMEOUT);

            if(kickConfirmation == true) {
                memberTarget.kick().catch(console.error);

                message.channel.send(userKickedBy)
                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userKickedBy)
                message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userKickedBy)
            }
        }
    }
}
