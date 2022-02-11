module.exports = {
    name: 'disconnect',
    description: 'Usage: "%disconnect (`<@user, all>`)"',
    aliases: ['dc'],
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%disconnect command help (BotPL3)')
                .setDescription('This command disconnects yourself, the targeted member if specified, or all members if specified.')
                .addField('Usage', "`%disconnect` (`<@user, all>`)")
                .addField('Aliases', "`dc`", true)
                .addField("Stats for nerds", "Lines: 93; File size: ~4.45 KB", false)
                .setFooter('This command is not case-sensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Variables
        const errorMustBeInVC = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('error: You must be in a voice channel to use this command')
        const errorTarget = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('Unknown user')
        //Checks
        if(!message.member.voice.channel) {
            message.channel.send(errorMustBeInVC)
            return;
        }
        //Code
        if(!args[0]) {
            const successDisconnect = new Discord.MessageEmbed()
                .setColor('00ff00')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription(`Disconnected <@${message.member.user.id}>`)

            message.member.voice.setChannel(null)
            message.channel.send(successDisconnect)
        } else {

            if(!message.member.roles.cache.find(role => role.name == 'BotPL3')) {
                const errorNoPermissions = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

                message.channel.send(errorNoPermissions)
                return;
            }
            if(args[0] == 'all') {
                message.member.voice.channel.members.forEach((member) => {
                    const successDisconnect = new Discord.MessageEmbed()
                        .setColor('00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`<@${message.member.user.id}> disconnected <@${member.user.id}>.`)

                    member.voice.setChannel(null)
                    message.channel.send(successDisconnect)
                })
            } else {
                const target = message.mentions.users.first();
                //Checks
                if(!target) {
                    message.channel.send(errorTarget)
                    return;
                }
                memberTarget = message.guild.members.cache.get(target.id);
                if(!memberTarget.voice.channel) {
                    const errorTargetNotInVC = new Discord.MessageEmbed()
                        .setColor('ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`error: <@${memberTarget.user.id}> must be in a voice channel for you to use this command.`)

                    message.channel.send(errorTargetNotInVC)
                    return;
                }
                const successDisconnect = new Discord.MessageEmbed()
                    .setColor('00ff00')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`<@${message.member.user.id}> disconnected <@${memberTarget.user.id}>.`)

                memberTarget.voice.setChannel(null)
                message.channel.send(successDisconnect)
            }
        }
    }
}
