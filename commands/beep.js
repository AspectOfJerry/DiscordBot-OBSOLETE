module.exports = {
    name: 'beep',
    cooldown: 3,
    description: 'Usage: "%beep"',
    execute(message, args, cmd, client, Discord){
        const beep = new Discord.MessageEmbed()
        .setColor('#ff55ff')
        .setDescription('Boop!')
        
        message.channel.send(beep);
    }
}