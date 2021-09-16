module.exports = {
    name: 'test0',
    cooldown: 10,
    description: "Usage: %test0",
    execute(message, args, cmd, client, Discord){
      message.reply('There is currently nothing to test!');



      
      const executedLog = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setDescription(`<@${message.member.user.id}> executed ${message.content}`)
      message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(executedLog)
    }
}