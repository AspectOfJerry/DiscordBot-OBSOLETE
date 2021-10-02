module.exports = {
    name: 'mute',
    aliases: ['tempmute', 'temp-mute', 'temp_mute'],
    description: 'Usage: ",mute <@user> (<duration s/m/y>)"',
    execute(message, args, cmd, client, Discord) {
        const ms = require(`ms`)
        if(message.member.roles.cache.has('890077443090706473')) {    //If 'message.member' has the role 'helper goldfish'
            const target = message.mentions.users.first();
            if(!args[0]) {
                const requireArgs0 = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error')
                    .setDescription('You must mention a member')

                message.channel.send(requireArgs0)
            } else {
                if(target) { //If 'target' is valid
                    let muteRole = message.guild.roles.cache.get('891751120882520083');   //Create 'muteRole' and assign it the mute role ID
                    let memberTarget = message.guild.members.cache.get(target.id);
                    const userMutedBy = new Discord.MessageEmbed()
                        .setColor('#ffff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User mute')
                        .setDescription(`<@${memberTarget.user.id}> was muted by <@${message.member.user.id}>`)
                        .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 64})}`)
                        .setFooter(`To unmute a member, execute ",unmute <@user>".`)
                    const userMutedForBy = new Discord.MessageEmbed()
                        .setColor('#ffff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User mute')
                        .setDescription(`<@${memberTarget.user.id}> was muted for ` + args[1] + ` by <@${message.member.user.id}>`)
                        .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 64})}`)
                        .setFooter(`To unmute a member, execute ",unmute <@user>".`)
                    const userUnmutedFromTimedMuteBy = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User unmuted from timed mute')
                        .setDescription(`<@${memberTarget.user.id}> was unmuted from the ` + args[1] + ` timed mute by <@${message.member.user.id}>`)
                        .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 64})}`)
                        .setFooter(`To mute a member, execute ",mute <@user> (<duration>)".`)
                    const targetHigherThanSender403 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Permissions error')
                        .setDescription(`<@${memberTarget.user.id}> has an equal or higher role than <@${message.member.user.id}>`)
                    const targetImmune403 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Permissions error')
                        .setDescription(`<@${memberTarget.user.id}> is immune to this command!`)
                    const targetAlreadyMuted = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription(`<@${memberTarget.user.id}> is already muted!`)

                    if(message.member == memberTarget) { //If 'message.member' is equal to 'memberTarget'
                        const cannotUseOnSelf = new Discord.MessageEmbed()
                            .setColor('#800080')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                            .setTitle('Error')
                            .setDescription('You cannot use this command on yourself!')

                        message.channel.send(cannotUseOnSelf)
                    } else {
                        if(memberTarget.roles.cache.has('891751120882520083')) {    //If 'memberTarget' has the role 'Muted'
                            message.channel.send(targetAlreadyMuted)
                        } else {
                            if(message.member.roles.cache.has('890075267517784116')) {    //If 'message.member' has the role 'overlord goldfish'
                                if(memberTarget.roles.cache.has('890075775540281384')) {    //If 'memberTarget' has the role 'bots'
                                    message.channel.send(targetImmune403);
                                } else if(memberTarget.roles.cache.has('890075267517784116')) { //If 'memberTarget' has the role 'overlord goldfish
                                    message.channel.send(targetHigherThanSender403);
                                } else {
                                    try {
                                        if(!args[1]) {   //If 'args[1]' is not present
                                            memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                            message.channel.send(userMutedBy)
                                            return;
                                        }   //If 'args[1]' is present
                                        memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                        message.channel.send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorMute = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught at line 89:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorMute)
                                    }
                                }
                            } else if(message.member.roles.cache.has('890076599926521916')) {   //If 'message.member' has the role 'admin goldfish'
                                if(memberTarget.roles.cache.has('890075775540281384')) {    //If 'memberTarget' has the role 'bots'
                                    message.channel.send(targetImmune403);
                                } else if(memberTarget.roles.cache.has('890075267517784116')) { //If 'memberTarget' has the role 'overlord goldfish'
                                    message.channel.send(targetHigherThanSender403);
                                } else if(memberTarget.roles.cache.has('890076599926521916')) { //If 'memberTarget' has the role 'admin goldfish'
                                    message.channel.send(targetHigherThanSender403);
                                } else {
                                    try {
                                        if(!args[1]) {   //If 'args[1]' is not present
                                            memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                            message.channel.send(userMutedBy)
                                            return;
                                        }   //If 'args[1]' is present
                                        memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                        message.channel.send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorMute = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught on line 121:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorMute)
                                    }
                                }
                            }   //If the message sender does not have the "BotPL1" role
                            else if(message.member.roles.cache.has('890076942164983808')) {   //If 'message.member' has the role 'moderator goldfish'
                                if(memberTarget.roles.cache.has('890075775540281384')) {    //If 'memberTarget' has the role 'bots'
                                    message.channel.send(targetImmune403);
                                } else if(memberTarget.roles.cache.has('890075267517784116')) { //If 'memberTarget' has the role 'overlord goldfish'
                                    message.channel.send(targetHigherThanSender403);
                                } else if(memberTarget.roles.cache.has('890076599926521916')) { //If 'memberTarget' has the role 'admin goldfish'
                                    message.channel.send(targetHigherThanSender403);
                                } else if(memberTarget.roles.cache.has('890076942164983808')) { //If 'memberTarget' has the role 'moderator goldfish'
                                    message.channel.send(targetHigherThanSender403)
                                } else {
                                    try {
                                        if(!args[1]) {   //If 'args[1]' is not present
                                            memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                            message.channel.send(userMutedBy)
                                            return;
                                        }   //If 'args[1]' is present
                                        memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                        message.channel.send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorMute = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught on line 156:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorMute)
                                    }
                                }
                            } else if(message.member.roles.cache.has('890077443090706473')) {   //if 'message.member' has the role 'helper goldfish'
                                if(memberTarget.roles.cache.has('890075775540281384')) {    //If 'memberTarget' has the role 'bots'
                                    message.channel.send(targetImmune403);
                                } else if(memberTarget.roles.cache.has('890075267517784116')) { //If 'memberTarget' has the role 'overlord goldfish'
                                    message.channel.send(targetHigherThanSender403);
                                } else if(memberTarget.roles.cache.has('890076599926521916')) { //If 'memberTarget' has the role 'admin goldfish'
                                    message.channel.send(targetHigherThanSender403);
                                } else if(memberTarget.roles.cache.has('890076942164983808')) { //If 'memberTarget' has the role 'moderator goldfish'
                                    message.channel.send(targetHigherThanSender403)
                                } else if(memberTarget.roles.cache.has('890077443090706473')) { //If 'memberTarget' has the role 'helper goldfish'
                                    message.channel.send(targetHigherThanSender403)
                                } else {
                                    try {
                                        if(!args[1]) {   //If 'args[1]' is not present
                                            memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                            message.channel.send(userMutedBy)
                                            return;
                                        }   //If 'args[1]' is present
                                        memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                        message.channel.send(userMutedForBy)

                                        setTimeout(function () {
                                            memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'
                                            message.channel.send(userUnmutedFromTimedMuteBy)
                                        }, ms(args[1]));
                                    } catch(error) {
                                        const errorMute = new Discord.MessageEmbed()
                                            .setColor('#ff0000')
                                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                            .setTitle('Error Catch')
                                            .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                            .setFooter(`An error was caught on line 192:39\nmessage.content = ${message.content}`)

                                        message.channel.send(errorMute)
                                    }
                                }
                            } else {
                                try {
                                    if(!args[1]) {   //If 'args[1]' is not present
                                        memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                        message.channel.send(userMutedBy)
                                        return;
                                    }   //If 'args[1]' is present
                                    memberTarget.roles.add(muteRole.id);    //Give 'muteRole' to 'memberTarget'
                                    message.channel.send(userMutedForBy)

                                    setTimeout(function () {
                                        memberTarget.roles.remove(muteRole.id); //Remove 'muteRole' from 'memberTarget'
                                        message.channel.send(userUnmutedFromTimedMuteBy)
                                    }, ms(args[1]));
                                } catch(error) {
                                    const errorMute = new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                        .setTitle('Error Catch')
                                        .setDescription(`An error occured while trying to mute <@${memberTarget.user.id}>`)
                                        .setFooter(`An error was caught on line 217:35\nmessage.content = ${message.content}`)

                                    message.channel.send(errorMute)
                                }
                            }
                        }
                    }
                } else {
                    const targetError = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription('The targeted member is invalid')

                    message.channel.send(targetError)
                }
            }
        } else {
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}