module.exports = {
    name: 'youtube',
    aliases: ['yt', 'ytb', 'itube', 'hetube', 'shetube', 'ittube', 'wetube', 'theytube'],
    cooldown: 15,
    description: 'Usage: "%youtube"',
    execute(message, args, cmd, client, Discord){
        const youtube = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Youtube channel')
            .setDescription(`<@611633988515266562>'s Youtube channel: https://www.youtube.com/channel/UCTaDDeM_nubCCb1HDLhlw-A`)
            .setURL('https://www.youtube.com/channel/UCTaDDeM_nubCCb1HDLhlw-A')
            .setFooter('Subscribe!')
            
        message.channel.send(youtube);
    }
}