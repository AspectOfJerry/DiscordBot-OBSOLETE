module.exports = {
    name: 'info',
    aliases: ['information', 'statistics'],
    description: 'Usage: "%info"',
    execute(message, args, cmd, client, Discord) {
        const sendInfo = new Discord.MessageEmbed()
            .setColor('0000ff')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Information about the bot')
            .setDescription('The bot is coded in JavaScript (discord.js) and uses Node.js.')
            .addField('GitHub Repository URL (private)', "https://github.com/AspectOfJerry/DiscordBot", false)
            .addField('Repository file size', "~181 MB", true)
            .addField('Repository total files', "15 020", true)
            .addField('Repository total folders', "2 011", true)
            .addField('Command files size', "~177 KB", true)
            .addField('Number of command files', "37", true)
            .addField('Command files total lines', "~3 400", true)

        message.channel.send(sendInfo)
    }
}
