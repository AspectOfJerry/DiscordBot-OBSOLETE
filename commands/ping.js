module.exports = {
    name: 'ping',
    cooldown: 10,
    description: 'Usage: "%ping"',
    execute(message, args, cmd, client, Discord) {
        const ping = new Discord.MessageEmbed()
            .setColor('#7dc8cd')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('pong')

        message.channel.send(ping);
    }
}