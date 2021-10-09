module.exports = {
    name: 'party',
    aliases: ['p'],
    description: 'Usage: "%party <@user>"',
    execute(message, args, cmd, client, Discord) {
        let target = message.mentions.users.first();
        if(!args[0]) {
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription('You must mention a member')
                .setFooter(`%party <args[0]> (<args[...]>)\n^requireArgs0`)

            message.channel.send(requireArgs0)
        } else {
            let memberTarget = message.guild.members.cache.get(target.id);
            if(message.member.voice.channel) {
                if(memberTarget.voice.channel) {
                    const partyInvite = new Discord.MessageEmbed()
                        .setColor('#ffff00')
                        .setTitle('Party invite')
                        .setDescription(`<@${message.member.user.id}> invited <@${memberTarget.user.id}> to the party! They have 60 seconds to accept`)
                        .setFooter('Reply "yes" or "no"')

                    let filter = m => m.author.id === memberTarget.user.id
                    message.channel.send(partyInvite)
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    })
                        .then(message => {
                            message = message.first()
                            if(message.content.toUpperCase() == 'YES') {
                                const joinedParty = new Discord.MessageEmbed()
                                    .setColor('#00ff00')
                                    .setDescription(`<@${memberTarget.user.id}> joined <@${message.member.user.id}>'s party!`)

                                message.channel.send(joinedParty)
                            } else if(message.content.toUpperCase() == 'NO') {
                                const declinedPartyInvite = new Discord.MessageEmbed()
                                    .setColor('#ff0000')
                                    .setDescription(`<@${memberTarget.user.id}> declined <@${message.member.user.id}>'s party invite!`)

                                message.channel.send(declinedPartyInvite)
                            } else {
                                const invalidReply = new Discord.MessageEmbed()
                                    .setColor('#ff0000')
                                    .setTitle('Error')
                                    .setDescription('Invalid reply! You must reply with "yes" or "no".')

                                message.channel.send(invalidReply)
                            }
                        })
                        .catch(collected => {
                            const requestTimeout = new Discord.MessageEmbed()
                                .setColor('#800080')
                                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                                .setTitle('Timeout')
                                .setDescription("Request timeout")

                            message.channel.send(requestTimeout)
                        });
                } else {
                    const requireTargetBeInVc = new Discord.MessageEmbed()
                        .setColor('ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription('The targeted member is not in a voice channel!')
                        .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 64})}`)

                    message.channel.send(requireTargetBeInVc)
                }
            } else {
                const requireUserBeInVC = new Discord.MessageEmbed()
                    .setColor('ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error')
                    .setDescription('You need to be in a voice channel to execute this command!')

                message.channel.send(requireUserBeInVC)
            }
        }
    }
}