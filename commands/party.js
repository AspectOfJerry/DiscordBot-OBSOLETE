module.exports = {
    name: 'party',
    aliases: ['p'],
    description: 'Usage: "%party <@user>"',
    execute(message, args, cmd, client, Discord) {
        message.channel.send('This command was put on hold')
        // let target = message.mentions.users.first();
        // let inviter = message.member.user.id;
        // let partyList = [`${message.member}`]
        // const partyCommands = new Discord.MessageEmbed()
        //     .setColor('#7dc8cd')
        //     .setTitle('Party command arguments')
        //     .setDescription("`invite`|`i` > Invites a member and moves them into the waiting room.\n"
        //         + "`add`|`a` > Forces a member into the party and moves them.\n"
        //         + "`kick`|`k` > Removes a member from the party and disconnects them.\n"
        //         + "`list`|`l` > Shows the list of members in the party.\n"
        //         + "`warp`|`w` > Moves the party into a new channel.\n"
        //         + "`disband`|`d` > Disbands the party and deletes the voice channel.")
        //     .setFooter('%party "<args[0]>" <args[1]>')

        // if(!args[0]) {
        //     message.channel.send(partyCommands)
        // } else {
        //     if(args[0] == 'invite' || args[0] == 'i') {
        //         if(!args[1]) {
        //             const requireArgs1 = new Discord.MessageEmbed()
        //                 .setColor('#ff0000')
        //                 .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
        //                 .setTitle('Error')
        //                 .setDescription('You must mention a member')
        //                 .setFooter(`%party <args[0]> "<args[1]>"`)

        //             message.channel.send(requireArgs1)
        //         } else {
        //             let memberTarget = message.guild.members.cache.get(target.id);
        //             if(message.member.voice.channel) {
        //                 if(memberTarget.voice.channel) {
        //                     const partyInvite = new Discord.MessageEmbed()
        //                         .setColor('#ffff00')
        //                         .setTitle('Party invite')
        //                         .setDescription(`<@${message.member.user.id}> invited <@${memberTarget.user.id}> to the party! They have 60 seconds to accept.`)
        //                         .setFooter('Reply "yes" or "no"')

        //                     let filter = m => m.author.id === memberTarget.user.id
        //                     message.channel.send(partyInvite)
        //                     message.channel.awaitMessages(filter, {
        //                         max: 1,
        //                         time: 60000,
        //                         errors: ['time']
        //                     })
        //                         .then(message => {
        //                             message = message.first()
        //                             if(message.content.toUpperCase() == 'YES') {
        //                                 const joinedParty = new Discord.MessageEmbed()
        //                                     .setColor('#00ff00')
        //                                     .setDescription(`<@${memberTarget.user.id}> joined <@${inviter}>'s party!`)

        //                                 message.channel.send(joinedParty)
        //                                 partyList.push(`${memberTarget}`);
        //                                 for(let index = 0; index < partyList.length; index++) {
        //                                     message.channel.send(partyList[index])

        //                                 }
        //                             } else if(message.content.toUpperCase() == 'NO') {
        //                                 const declinedPartyInvite = new Discord.MessageEmbed()
        //                                     .setColor('#ff0000')
        //                                     .setDescription(`<@${memberTarget.user.id}> declined <@${inviter}>'s party invite!`)

        //                                 message.channel.send(declinedPartyInvite)
        //                             } else {
        //                                 const invalidReply = new Discord.MessageEmbed()
        //                                     .setColor('#ff0000')
        //                                     .setTitle('Error')
        //                                     .setDescription('Invalid reply! You must reply with "yes" or "no".')

        //                                 message.channel.send(invalidReply)
        //                             }
        //                         })
        //                         .catch(collected => {
        //                             const requestTimeout = new Discord.MessageEmbed()
        //                                 .setColor('#800080')
        //                                 .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
        //                                 .setTitle('Timeout')
        //                                 .setDescription("Request timeout")

        //                             message.channel.send(requestTimeout)
        //                         });
        //                 } else {
        //                     const requireTargetBeInVc = new Discord.MessageEmbed()
        //                         .setColor('ff0000')
        //                         .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
        //                         .setTitle('Error')
        //                         .setDescription('The targeted member is not in a voice channel!')
        //                         .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 64})}`)

        //                     message.channel.send(requireTargetBeInVc)
        //                 }
        //             } else {
        //                 const requireUserBeInVC = new Discord.MessageEmbed()
        //                     .setColor('ff0000')
        //                     .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
        //                     .setTitle('Error')
        //                     .setDescription('You need to be in a voice channel to execute this command!')

        //                 message.channel.send(requireUserBeInVC)
        //             }
        //         }
        //     } else if(args[0] == 'add' || args[0] == 'a') {
        //         message.channel.send('FORCE_INVITE')
        //     } else if(args[0] == 'kick' || args[0] == 'k' || args[0] == 'remove' || args[0] == 'r') {
        //         message.channel.send('REMOVE')
        //     } else if(args[0] == 'list' || args[0] == 'l', partyList) {
        //         for(let index = 0; index < partyList.length; index++) {
        //             message.channel.send(partyList[index])
        //         }
        //     } else if(args[0] == 'warp' || args[0] == 'w') {
        //         message.channel.send('WARP')
        //     } else if(args[0] == 'disband' || args[0] == 'd') {
        //         message.channel.send('DISBAND')
        //     } else {
        //         message.channel.send(partyCommands)
        //     }
        // }
    }
}
