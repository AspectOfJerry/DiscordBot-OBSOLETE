module.exports = {
    name: 'ping',
    aliases: ['latency'],
    description: 'Usage: "%ping"',
    execute(message, args, cmd, client, Discord) {
        let pong;
        const sendingPing = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('sending ping...')

        message.channel.send(sendingPing).then(resultMessage => {
            pong = new Discord.MessageEmbed()
                .setColor('#7dc8cd')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .addField(`Bot latency`, `~${resultMessage.createdTimestamp - message.createdTimestamp}ms`, true)
                .addField(`DiscordJS API latency`, `~${client.ws.ping}ms`, true)

            message.channel.bulkDelete(1).catch(console.error);
            message.channel.send(pong)
        })
    }
}
