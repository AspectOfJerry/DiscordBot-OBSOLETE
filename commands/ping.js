module.exports = {
    name: 'ping',
    aliases: ['latency'],
    description: 'Usage: "%ping"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const HELP_COMMAND = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%ping command help')
                .setDescription("This command displays the bot's latency and the websocket server latency in milliseconds.")
                .addField(`Usage`, "`%ping`", true)
                .addField(`Aliases`, "`latency`", true)
                .addField("Stats for nerds", "Lines: `40`; File size: `~1.75` KB", false)
                .setFooter('This command is case-insensitive.')

            message.channel.send(HELP_COMMAND)
            return;
        }
        //Declaring variables
        let sendPong;
        const sendingPing = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('sending ping...');
        //Code
        message.channel.send(sendingPing).then(resultMessage => {
            sendPong = new Discord.MessageEmbed()
                .setColor('#7dc8cd')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .addField(`Bot latency`, `~${resultMessage.createdTimestamp - message.createdTimestamp}ms`, true)
                .addField(`DiscordJS API latency`, `~${client.ws.ping}ms`, true);

            message.channel.bulkDelete(1).catch(console.error)
            message.channel.send(sendPong)
        })
    }
}
