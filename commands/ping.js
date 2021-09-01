module.exports = {
    name: 'ping',
    cooldown: 10,
    description: 'Usage: "%ping"',
    execute(message, args, cmd, client, Discord){
        const ping = new Discord.MessageEmbed()
        .setColor('#7cc0c0')
        .setDescription('pong')
        
        message.channel.send(ping);
    }
}