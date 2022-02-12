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
                .addField('Usage', '`%send` `<#channel>` `<message>`', true)
                .addField('Related commands', '`%say`', true)
                .addField("Stats for nerds", "Lines: `48`; File size: `~1.95` KB", false)
                .setFooter('This command is case-insensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Declaring variables
        let targetChannelID
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
            targetChannelID = args[0].replace(/<|#|>/gi, "")
            messageSend = args.shift()
            messageSend = args.join(" ")

            message.channel.bulkDelete(1).catch(console.error);
            client.channels.cache.get(targetChannelID).send(messageSend)
        }
    }
}
