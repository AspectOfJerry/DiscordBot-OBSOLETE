module.exports = {
    name: 'embedmethods',
    cooldown: 10,
    description: "Usage: %embedmethods",
    execute(message, args, cmd, client, Discord){
      
      const methods = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('.setTitle')
        .setURL('https://discord.gg')
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