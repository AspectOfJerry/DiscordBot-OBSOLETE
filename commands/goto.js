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
        const errorArgs0 = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('error: You must enter a valid Public channel number: `0`, `1`, `2`.')
        const errorMustBeInVC = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('error: You must be in a voice channel to use this command')
        const errorTarget = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('Unknown user')
        const errorTargetMustBeInVC = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('error: The target must be in a voice channel for you to use this command')
        const successMoveTo = new Discord.MessageEmbed()
            .setColor('00ff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`Moved <@${message.member.user.id}> to [VOICE_CHANNEL].`)
        //Code

        
    }
}
