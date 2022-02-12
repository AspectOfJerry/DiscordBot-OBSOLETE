module.exports = {
    name: 'goto',
    description: 'Usage: "%goto <#channel> (<@user>)"',
    aliases: ['go', 'switch', 'move'],
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%goto command help (BotPL3)')
                .setDescription('This command moves you, a user or all the users to a specific channel.')
                .addField('Usage', "`%goto` `<#channel>` (`<@user, all`)", true)
                .addField('Aliases', "`go`, `move`, `switch`", true)
                .addField('Related commands', "`return`, `disconnect`", false)
                .addField("Stats for nerds", "Lines: `127`; File size: `~6.05` KB", false)
                .setFooter('This command is case-insensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Declaring variables
        let voiceChannelID
        let memberTarget
        const errorMustBeInVC = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('error: You must be in a voice channel to use this command.')
        const errorTarget = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('Unknown user')
        const errorRequireTargetChannel = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('error: You must provide a voice channel by tagging it or my sending its ID.')
        const errorInvalidVoiceChannel = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('error: The targeted voice channel is invalid.')
        //Checks
        if(!message.member.roles.cache.find(role => role.name === 'BotPL3')) {
            const errorNoPermissions = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(errorNoPermissions)
            return;
        }
        //Code
        if(!message.member.voice.channel) {
            message.channel.send(errorMustBeInVC)
            return;
        }
        if(!args[1]) {

            if(!args[0]) {
                message.channel.send(errorRequireTargetChannel)
                return;
            }
            voiceChannelID = args[0].replace(/<|#|>/gi, "")
            if(!message.guild.channels.cache.get(voiceChannelID)) {
                message.channel.send(errorInvalidVoiceChannel)
                return;
            }
            const successMoveTo = new Discord.MessageEmbed()
                .setColor('00ff00')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription(`Moved <@${message.member.user.id}> to <#${voiceChannelID}>.`)

            message.member.voice.setChannel(voiceChannelID)
            message.channel.send(successMoveTo)
        } else {

            if(args[1] == 'all') {
                voiceChannelID = args[0].replace(/<|#|>/gi, "")
                if(!message.guild.channels.cache.get(voiceChannelID)) {
                    message.channel.send(errorInvalidVoiceChannel)
                    return;
                }
                message.member.voice.channel.members.forEach((member) => {
                    const successMoveTo = new Discord.MessageEmbed()
                        .setColor('00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`Moved ${member} to <#${voiceChannelID}>.`)

                    member.voice.setChannel(voiceChannelID)
                    message.channel.send(successMoveTo)
                })
            } else {
                //Variables
                voiceChannelID = args[0].replace(/<|#|>/gi, "")
                const target = message.mentions.users.first();
                //Checks
                if(!target) {
                    message.channel.send(errorTarget)
                    return;
                }
                if(!message.guild.channels.cache.get(voiceChannelID)) {
                    message.channel.send(errorInvalidVoiceChannel)
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
                //Code
                const successMoveTo = new Discord.MessageEmbed()
                    .setColor('00ff00')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`Moved <@${memberTarget.user.id}> to <#${voiceChannelID}>.`)

                memberTarget.voice.setChannel(voiceChannelID)
                message.channel.send(successMoveTo)
            }
        }

    }
}
