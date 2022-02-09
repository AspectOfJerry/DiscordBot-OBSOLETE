module.exports = {
    name: 'send',
    description: 'Usage: "%send <#channel> <message>"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%send command help')
                .setDescription('This command sends a message to a specific channel.')
                .addField('Usage', '`%send` `<#channel>` `<message>', false)
                .addField('Related commands', '`%say`', false)
                .addField("Stats for nerds", "Lines: 50; File size: ~2.05 KB", false)
                .setFooter('This command is not case-sensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Declaring variables
        let targetChannel
        let messageSend
        //Code
        if(!args[0]) {
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You must tag a channel')

            message.channel.send(requireArgs0)
        } else if(!args[1]) {
            const requireArgs1 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You must enter a message to send')

            message.channel.send(requireArgs1)
        } else {
            targetChannel = args[0]
            targetChannelID = targetChannel.replace('<#', "")
            targetChannelID = targetChannelID.replace('>', "")
            messageSend = args.shift()
            messageSend = args.join(" ")

            message.channel.bulkDelete(1).catch(console.error);
            client.channels.cache.get(targetChannelID).send(messageSend)
        }
    }
}
