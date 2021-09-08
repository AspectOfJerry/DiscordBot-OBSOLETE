module.exports = {
    name: 'test',
    cooldown: 10,
    description: "Usage: %test",
    execute(message, args, cmd, client, Discord){
      
      //message.reply('There is currently nothing to test!');
      const test = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('.setTitle')
        .setAuthor(`${message.member}`)
        .setDescription('.setDescription')
        .setFooter('.setFooter')

        message.channel.send(test)
    }
}