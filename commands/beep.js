module.exports = {
    name: 'beep',
    description: 'Usage: "%beep"',
    execute(message, args, cmd, client, Discord) {
        const sendBeep = new Discord.MessageEmbed()
            .setColor('#ff55ff')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('Boop!')

        message.channel.send(sendBeep)
    }
}
