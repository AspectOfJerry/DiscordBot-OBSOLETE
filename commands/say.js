module.exports = {
    name: 'say',
    description: 'Usage: "%say <message>"',
    execute(message, args, cmd, client, Discord) {
        let messageSend

        if(!args[0]) {
            const requireArgs1 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You must enter a message to say')

            message.channel.send(requireArgs1)
        } else {
            messageSend = args.join(" ")

            message.channel.bulkDelete(1).catch(console.error);
            message.channel.send(messageSend)
        }
    }
}