module.exports = {
    name: 'pong',
    cooldown: 3,
    description: 'Usage: "%pong"',
    execute(message, args, cmd, client, Discord) {
        const pong = new Discord.MessageEmbed()
            .setColor('#7dc8cd')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setDescription('ping')

        message.channel.send(pong);
    }
}