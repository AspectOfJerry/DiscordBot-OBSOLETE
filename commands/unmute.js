module.exports = {
    name: 'unmute',
    aliases: ['un-mute', 'un_mute'],
    description: 'Usage: "%unmute <@user>"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const HELP_COMMAND = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%unmute command help')
                .setDescription('This command unmutes a muted member.')
                .addField(`Usage`, "`%unmute` `<@user>`", true)
                .addField(`Aliases`, "`un_mute`, `un-mute`", true)
                .addField("Stats for nerds", "Lines: `155`; File size: `~8.3` KB", false)
                .setFooter('This command is case-insensitive.')

            message.channel.send(HELP_COMMAND)
            return;
        }
        //Checklist
        if(!message.member.roles.cache.find(role => role.name === 'BotPL3')) {
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
                .setDescription('You must mention a member to unmute!')

            message.channel.send(ERROR_REQUIRE_ARGS_0)
            return;
        }
        const TARGET = message.mentions.users.first();
        if(TARGET) {
            const ERROR_TARGET = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('Unknown user')

            message.channel.send(ERROR_TARGET)
            return;
        }
        let memberTarget = message.guild.members.cache.get(target.id);
        if(message.member == memberTarget) {
            const ERROR_CANNOT_SELF = new Discord.MessageEmbed()
                .setColor('#800080')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You cannot use this command on yourself!')

            message.channel.send(ERROR_CANNOT_SELF)
            return;
        }
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if(!memberTarget.roles.cache.find(role => role.name === 'Muted')) {
            message.channel.send(ERROR_USER_NOT_MUTED)
            return;
        }
        //Declaring variables

        const USER_UNMUTE = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('User unmute')
            .setDescription(`<@${memberTarget.user.id}> was unmuted by <@${message.member.user.id}>`)
            .setFooter(`To mute a member, use "%mute <@user> (<duration>)"`)
        const ERROR_PERMISSIONS_TOO_LOW = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`<@${memberTarget.user.id}> has an equal or higher role than <@${message.member.user.id}>`)
        const ERROR_TARGET_IMMUNE = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`<@${memberTarget.user.id}> is immune to this command!`)
        const ERROR_USER_NOT_MUTED = new Discord.MessageEmbed()
            .setColor('#800080')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`<@${memberTarget.user.id}> is not muted!`)
        //Code
        if(message.member.roles.cache.find(role => role.name === 'BotPL0')) {   //message.member

            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(ERROR_TARGET_IMMUNE);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else {
                memberTarget.roles.remove(muteRole.id).catch(console.error);

                message.channel.send(USER_UNMUTE)
                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(USER_UNMUTE);
            }
        } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')) {    //message.member

            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(ERROR_TARGET_IMMUNE);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW);
            } else {
                memberTarget.roles.remove(muteRole.id).catch(console.error);

                message.channel.send(USER_UNMUTE)
                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(USER_UNMUTE);
            }
        } else if(message.member.roles.cache.find(role => role.name === 'BotPL2')) {    //message.member

            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(ERROR_TARGET_IMMUNE)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) { //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else {
                memberTarget.roles.remove(muteRole.id).catch(console.error);

                message.channel.send(USER_UNMUTE)
                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(USER_UNMUTE);

            }
        } else if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {    //message.member

            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(ERROR_TARGET_IMMUNE)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL2')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL3')) {  //memberTarget
                message.channel.send(ERROR_PERMISSIONS_TOO_LOW)
            } else {
                memberTarget.roles.remove(muteRole.id).catch(console.error);

                message.channel.send(USER_UNMUTE)
                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(USER_UNMUTE);
            }
        } else {
            memberTarget.roles.remove(muteRole.id).catch(console.error);

            message.channel.send(USER_UNMUTE)
            message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(USER_UNMUTE);
        }
    }
}
