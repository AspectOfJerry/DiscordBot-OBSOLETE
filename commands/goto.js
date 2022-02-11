module.exports = {
    name: 'goto',
    description: 'Usage: "%goto <#channel> (<@user>)"',
    aliases: ['go', 'switch', 'move'],
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
            //     .setColor('0000ff')
            //     .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            //     .setTitle('%goto command help')
            //     .addField("Stats for nerds", "Lines: ; File size: ~ KB", false)
            //     .setFooter('This command is not case-sensitive.')

            // message.channel.send(helpCommand)
            message.reply('The help feature is under development for this command.')
            return;
        }
        //Declaring variables
        let targetChannelID
        let memberTarget
        const errorArgs0 = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('error: You must enter a valid Public channel number: `0`, `1`, `2`.')
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
            targetChannelID = args[0]
            if(!message.guild.channels.cache.get(targetChannelID)) {
                message.channel.send(errorInvalidVoiceChannel)
                return;
            }
            const successMoveTo = new Discord.MessageEmbed()
                .setColor('00ff00')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription(`Moved <@${message.member.user.id}> to <#${targetChannelID}>.`)
            
            message.member.voice.setChannel(targetChannelID)
            message.channel.send(successMoveTo)
        } else {

            if(args[1] == 'all') {

            } else {
                //Variables
                targetChannelID = args[0]
                const target = message.mentions.users.first();
                //Checks
                if(!target) {
                    message.channel.send(errorTarget)
                    return;
                }
                if(!message.guild.channels.cache.get(targetChannelID)) {
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
                    .setDescription(`Moved <@${memberTarget.user.id}> to <#${targetChannelID}>.`)

                memberTarget.voice.setChannel(targetChannelID)
                message.channel.send(successMoveTo)
            }
        }

    }
}
