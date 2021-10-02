module.exports = {
    name: 'pong',
    description: 'Usage: "%pong"',
    execute(message, args, cmd, client, Discord) {
        const pong = new Discord.MessageEmbed()
            .setColor('#ff5eef')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('ping')

        message.channel.send(pong);
    }
}