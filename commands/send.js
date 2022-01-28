module.exports = {
    name: 'send',
    description: 'Usage: "%send <#channel> <message>"',
    execute(message, args, cmd, client, Discord) {
        let targetChannel
        let messageSend

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