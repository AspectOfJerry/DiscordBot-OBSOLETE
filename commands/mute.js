module.exports = {
    name: 'mute',
    aliases: ['tempmute', 'temp-mute', 'temp_mute', 'shutup', 'shut-up', 'shut_up'],
    description: 'Usage: "%mute <@user> (<duration s/m/y>)"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const HELP_COMMAND = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%mute command help (BotPL3)')
                .setDescription('This command mutes the mentioned user permanently if a duration is not provided.')
                .addField(`Usage`, "`%mute` `<@user>` (`<duration>`)", true)
                .addField(`Aliases`, "`tempmute`, `temp_mute`, `temp-mute`, `shutup`, `shut_up`, `shut-up`", false)
                .addField("Stats for nerds", "Lines: `294`; File size: `~15.6` KB", false)
                .setFooter("This command is case-insensitive.")

            message.channel.send(HELP_COMMAND)
            return;
        }
        //Checks
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {
            const ERROR_NO_PERMISSIONS = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(ERROR_NO_PERMISSIONS)
            return;
        }
        if(!args[0]) {
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You must mention a user to mute!')

            message.channel.send(requireArgs0)
            return;
        }
        const target = message.mentions.users.first();
        if(target) {
            const errorTarget = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('Unknown user')

            message.channel.send(errorTarget)
            return;
        }
        let memberTarget = message.guild.members.cache.get(target.id);
        if(message.member == memberTarget) {
            const ERROR_CANNOT_SELF = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You cannot use this command on yourself!')

            message.channel.send(ERROR_CANNOT_SELF)
            return;
        }
        if(memberTarget.roles.cache.find(role => role.name == 'Muted')) {
            const targetAlreadyMuted = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription(`<@${memberTarget.user.id}> is already muted!`)

            message.channel.send(targetAlreadyMuted)
            return;
        }
        //Declaring variables
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        const ms = require(`ms`)
        const userMutedBy = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('User mute')
            .setDescription(`<@${memberTarget.user.id}> was muted by <@${message.member.user.id}>`)
            .setFooter(`To unmute a member, execute "%unmute <@user>".`)
        const userMutedForBy = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('User mute')
            .setDescription(`<@${memberTarget.user.id}> was muted for ` + args[1] + ` by <@${message.member.user.id}>`)
            .setFooter(`To unmute a member, execute "%unmute <@user>".`)
        const userUnmutedFromTimedMuteBy = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('User unmuted from timed mute')
            .setDescription(`<@${memberTarget.user.id}> was unmuted from the ` + args[1] + ` timed mute by <@${message.member.user.id}>`)
            .setFooter(`To mute a member, execute "%mute <@user> (<duration>)".`)
        const ERROR_PERMISSIONS_TOO_LOW = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`<@${memberTarget.user.id}> has an equal or higher role than <@${message.member.user.id}>`)
        const ERROR_TARGET_IMMUNE = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`<@${memberTarget.user.id}> is immune to this command!`);
        //Code
        if(message.member.roles.cache.find(role => role.name === 'BotPL0')) {   //message.member

            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(ERROR_TARGET_IMMUNE);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else {
                try {
                    if(!args[1]) {
                        memberTarget.roles.add(muteRole.id);

                        message.channel.send(userMutedBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy);
                        return;
                    }
                    memberTarget.roles.add(muteRole.id);

                    message.channel.send(userMutedForBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy);

                    setTimeout(function () {
                        memberTarget.roles.remove(muteRole.id);

                        message.channel.send(userUnmutedFromTimedMuteBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy);
                    }, ms(args[1]));
                } catch(error) {
                    const errorCatch = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error Catch')
                        .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                        .setFooter(`An error was caught at line 94:39\nmessage.content = ${message.content}`)

                    message.channel.send(errorCatch)
                }
            }
        } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')) {    //message.member

            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(ERROR_TARGET_IMMUNE);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else {
                try {
                    if(!args[1]) {
                        memberTarget.roles.add(muteRole.id);

                        message.channel.send(userMutedBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy);
                        return;
                    }
                    memberTarget.roles.add(muteRole.id);

                    message.channel.send(userMutedForBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy);

                    setTimeout(function () {
                        memberTarget.roles.remove(muteRole.id);

                        message.channel.send(userUnmutedFromTimedMuteBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy);
                    }, ms(args[1]));
                } catch(error) {
                    const errorCatch = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error Catch')
                        .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                        .setFooter(`An error was caught on line 129:39\nmessage.content = ${message.content}`)

                    message.channel.send(errorCatch)
                }
            }
        }
        else if(message.member.roles.cache.find(role => role.name === 'BotPL2')) {  //message.member

            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(ERROR_TARGET_IMMUNE);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else {
                try {
                    if(!args[1]) {
                        memberTarget.roles.add(muteRole.id);

                        message.channel.send(userMutedBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy);
                        return;
                    }
                    memberTarget.roles.add(muteRole.id);

                    message.channel.send(userMutedForBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy);

                    setTimeout(function () {
                        memberTarget.roles.remove(muteRole.id);

                        message.channel.send(userUnmutedFromTimedMuteBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy);
                    }, ms(args[1]));
                } catch(error) {
                    const errorCatch = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error Catch')
                        .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                        .setFooter(`An error was caught on line 167:39\nmessage.content = ${message.content}`)

                    message.channel.send(errorCatch)
                }
            }
        } else if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {    //message.member

            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(ERROR_TARGET_IMMUNE);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL3')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else {
                try {
                    if(!args[1]) {
                        memberTarget.roles.add(muteRole.id);

                        message.channel.send(userMutedBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy);
                        return;
                    }
                    memberTarget.roles.add(muteRole.id);

                    message.channel.send(userMutedForBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy);

                    setTimeout(function () {
                        memberTarget.roles.remove(muteRole.id);

                        message.channel.send(userUnmutedFromTimedMuteBy)
                        message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy);
                    }, ms(args[1]));
                } catch(error) {
                    const errorCatch = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error Catch')
                        .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                        .setFooter(`An error was caught on line 206:39\nmessage.content = ${message.content}`)

                    message.channel.send(errorCatch);
                }
            }
        } else {
            try {
                if(!args[1]) {
                    memberTarget.roles.add(muteRole.id);

                    message.channel.send(userMutedBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedBy);
                    return;
                }
                memberTarget.roles.add(muteRole.id);

                message.channel.send(userMutedForBy)
                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userMutedForBy);

                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id);

                    message.channel.send(userUnmutedFromTimedMuteBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userUnmutedFromTimedMuteBy);
                }, ms(args[1]));
            } catch(error) {
                const errorCatch = new Discord.MessageEmbed()
                    .setColor('#800080')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error Catch')
                    .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                    .setFooter(`An error was caught on line 234:35\nmessage.content = ${message.content}`)

                message.channel.send(errorCatch);
            }
        }
    }
}
