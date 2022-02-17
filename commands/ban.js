module.exports = {
    name: 'ban',
    description: "Usage: %ban <@user>",
    execute(message, args, cmd, client, Discord) {
        //Help
        if(args[0] == '?') {
            const HELP_COMMAND = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%ban command help (BotPL1)')
                .setDescription('This command bans the mentionned user from the guild.')
                .addField(`Usage`, "`%ban` `<@user>`", false)
                .addField('Related commands', "`kick`", false)
                .addField("Stats for nerds", "Lines: `147`; File size: `~7.9` KB", false)
                .setFooter('This command is case-insensitive.')

            message.channel.send(HELP_COMMAND)
            return;
        }
        //Checks
        if(!message.member.roles.cache.find(role => role.name === 'BotPL1')) {
            const ERROR_NO_PERMISSIONS = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(ERROR_NO_PERMISSIONS)
            return;
        }
        if(!args[0]) {
            const ERROR_REQUIRE_ARGS_0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You must mention a member to ban!')

            message.channel.send(ERROR_REQUIRE_ARGS_0)
            return;
        }
        const target = message.mentions.users.first();
        if(!target) {
            const ERROR_TARGET = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('Unknown user')

            message.channel.send(ERROR_TARGET)
            return;
        }
        const memberTarget = message.guild.members.cache.get(target.id);
        if(memberTarget == message.member) {
            const ERROR_CANNOT_SELF = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You cannot use this command on yourself!')

            message.channel.send(ERROR_CANNOT_SELF);
            return;
        }
        //Declaring variables
        let banConfirmation = true;
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
        const USER_BAN = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('User ban')
            .setDescription(`<@${memberTarget.user.id}> was banned from the guild by <@${message.member.user.id}>`)
            .setFooter(`To unban a member, go to "Server Settings" > "Bans" > "Revoke Ban".`)
        //Declaring functions
        function confirmBanFriend(message, args, cmd, client, Discord, memberTarget, REQUEST_ABORTED, REQUEST_TIMEOUT) {
            //Declaring variables
            const confirmBanFriend = new Discord.MessageEmbed()
                .setColor('ffff00')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription(`yes/no: Are you sure to ban <@${memberTarget.user.id}>? They are <@611633988515266562>'s friend.`)
                .setFooter('Request pending [10s]')
            //Code
            if(memberTarget.roles.cache.find(role => role.name == 'Friends')) {

                let filter = m => m.author.id === message.author.id

                message.channel.send(confirmBanFriend);

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
        if(message.member.roles.cache.find(role => role.name === 'BotPL0')) {   //message.member
            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(ERROR_TARGET_IMMUNE);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else {
                banConfirmation = confirmBanFriend(message, args, cmd, client, Discord, memberTarget, REQUEST_ABORTED, REQUEST_TIMEOUT)

                if(banConfirmation == true) {
                    memberTarget.ban().catch(console.error);    //Ban

                    message.channel.send(USER_BAN)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(USER_BAN)
                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(USER_BAN)
                    return;
                }
            }
        } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')) {    //message.member
            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(ERROR_TARGET_IMMUNE)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else {
                banConfirmation = confirmBanFriend(message, args, cmd, client, Discord, memberTarget, REQUEST_ABORTED, REQUEST_TIMEOUT)

                if(banConfirmation == true) {
                    memberTarget.ban().catch(console.error);    //Ban

                    message.channel.send(USER_BAN)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(USER_BAN)
                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(USER_BAN)
                    return;
                }
            }
        } else {
            banConfirmation = confirmBanFriend(message, args, cmd, client, Discord, memberTarget, REQUEST_ABORTED, REQUEST_TIMEOUT)

            if(banConfirmation == true) {
                memberTarget.ban().catch(console.error);    //Ban

                message.channel.send(USER_BAN)
                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(USER_BAN)
                message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(USER_BAN)
                return;
            }
        }
    }
}
