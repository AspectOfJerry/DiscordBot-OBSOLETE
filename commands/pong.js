module.exports = {
    name: 'pong',
    cooldown: 3,
    description: 'Usage: "%pong"',
    execute(message, args, cmd, client, Discord){
        const pong = new Discord.MessageEmbed()
        .setColor('#7cc0c0')
        .setDescription('ping')
        
        message.channel.send(pong);
    }
}