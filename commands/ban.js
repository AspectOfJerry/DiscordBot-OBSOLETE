module.exports = {
    name: 'ban',
    description: "Usage: %ban <@user>",
    execute(message, args, cmd, client, Discord) {
        //Help
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%ban command help')
                .setDescription('This command bans the mentionned user from the guild.')
                .addField(`Usage`, "`%ban` `<@user>`", true)
                .setFooter('This command is not case-sensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Checklist
        if(!message.member.roles.cache.find(role => role.name === 'BotPL1')) {
            const errorNoPermissions = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(errorNoPermissions)
            return;
        }
        if(!args[0]) {
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You must mention a member to ban!')

            message.channel.send(requireArgs0)
            return;
        }
        const target = message.mentions.users.first();
        if(!target) {
            const errorTarget = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('Unknown user')

            message.channel.send(errorTarget)
            return;
        }
        const memberTarget = message.guild.members.cache.get(target.id);
        if(memberTarget == message.member) {
            const errorCannotUseOnSelf = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You cannot use this command on yourself!')

            message.channel.send(errorCannotUseOnSelf);
            return;
        }
        //Declaring variables
        const sendUserBannedBy = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('User ban')
            .setDescription(`<@${memberTarget.user.id}> was banned from the guild by <@${message.member.user.id}>`)
            .setFooter(`To unban a member, go to "Server Settings" > "Bans" > "Revoke Ban".`)
        const errorPermissionsTooLow = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`<@${memberTarget.user.id}> has an equal or higher role than <@${message.member.user.id}>`)
        const errorTargetImmune = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`<@${memberTarget.user.id}> is immune to this command!`)
        const confirmBanFriend = new Discord.MessageEmbed()
            .setColor('ffff00')
            .setDescription(`Are you sure to ban <@${memberTarget.user.id}>? They are your friend.`)
            .setFooter('Reply with "yes" or "no".')
        //Code
        if(message.member.roles.cache.find(role => role.name === 'BotPL0')) {   //message.member
            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(errorTargetImmune);
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                message.channel.send(errorPermissionsTooLow)
            } else {
                try {
                    memberTarget.ban().catch(console.error);    //Ban

                    message.channel.send(sendUserBannedBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(sendUserBannedBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(sendUserBannedBy)
                } catch(error) {    //try   @53:33
                    const errorCatch = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error Catch')
                        .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                        .setFooter(`An error was caught at line 58:33\nmessage.content = ${message.content}`)

                    message.channel.send(errorCatch)
                }
            }
        } else if(message.member.roles.cache.find(role => role.name === 'BotPL1')) {    //message.member
            if(memberTarget.roles.cache.find(role => role.name === 'Bots')) {   //memberTarget
                message.channel.send(errorTargetImmune)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {  //memberTarget
                message.channel.send(errorPermissionsTooLow)
            } else if(memberTarget.roles.cache.find(role => role.name === 'BotPL1')) {  //memberTarget
                message.channel.send(errorPermissionsTooLow)
            } else {
                try {
                    memberTarget.ban().catch(console.error);    //Ban

                    message.channel.send(sendUserBannedBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(sendUserBannedBy)
                    message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(sendUserBannedBy)
                } catch(error) {
                    const errorCatch = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error Catch')
                        .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                        .setFooter(`An error was caught at line 83:35\nmessage.content = ${message.content}`)

                    message.channel.send(errorCatch)
                }
            }
        } else {
            try {
                memberTarget.ban().catch(console.error);    //Ban

                message.channel.send(sendUserBannedBy)
                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(sendUserBannedBy)
                message.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(sendUserBannedBy)
            } catch(error) {
                const errorCatch = new Discord.MessageEmbed()
                    .setColor('#800080')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error Catch')
                    .setDescription(`An error occured while trying to ban <@${memberTarget.user.id}>`)
                    .setFooter(`An error was caught at line 101:31\nmessage.content = ${message.content}`)

                message.channel.send(errorCatch)
            }
        }
    }
}
