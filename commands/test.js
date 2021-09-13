module.exports = {
    name: 'test',
    cooldown: 10,
    description: "Usage: %test",
    execute(message, args, cmd, client, Discord){
      //message.reply('There is currently nothing to test!');

      const methods = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('.setTitle')
        .setURL('https://discord.com')
        .setAuthor(`${message.member}`, '')
        .setDescription('.setDescription')
        .setThumbnail('')
        .addField('.addField', 'inline: true', true)
        .addBlankField()
        .addField('.addField', 'inline: false', false)
        .setImage('')
        .setTimestamp()
        .setFooter('.setFooter')

      message.channel.send(methods)
    }
}