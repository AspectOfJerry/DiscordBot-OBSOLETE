const { execute } = require("./play");

module.exports = {
    name: 'leave',
    aliases: ['dc', 'disconnect'],
    cooldown: 10,
    description: 'Usage: "%leave <URL/keyWords>"',
    async execute(message, args, cmd, client, Discord) {
        const voiceChannel = message.member.voice.channel;

        const requireUserBeInChannel = new Discord.MessageEmbed()
        .setColor('#800080')
        .setTitle('Error 400: "' + message.content + '"')
        .setDescription('Could **not** perform the __command__! You must **be** in a __voice channel__ to use this command!')
        .setFooter('400 BAD_REQUEST')

        if(!voiceChannel) return message.channel.send(requireUserBeInChannel)
        await voiceChannel.leave();

        const leave = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Executed: "' + message.content + '"')
        .setDescription('Successfully left the channel!')
        .setFooter('200 OK')
        
        message.channel.send(leave)
    }
}