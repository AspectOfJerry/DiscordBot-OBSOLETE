module.exports = {
    name: 'youtube',
    aliases: ['yt', 'ytb', 'itube', 'hetube', 'hetubes', 'shetube', 'shetubes', 'ittube', 'ittubes', 'wetube', 'theytube'],

    description: 'Usage: "%youtube"',
    execute(message, args, cmd, client, Discord) {
        const youtube = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Youtube channel')
            .setDescription(`<@872225094787809291>'s Youtube channel: https://www.youtube.com/channel/UCgro81OCGKf9gNVZsPqF6-Q`)
            .setURL('https://www.youtube.com/channel/UCgro81OCGKf9gNVZsPqF6-Q')
            .setFooter('Subscribe!')

        message.channel.send(youtube);
    }
}