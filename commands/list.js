module.exports = {
    name: 'list',
    aliases: ['commands', 'commandhelp', 'commandshelp'],
    description: 'Usage: "%list"',
    execute(message, args, cmd, client, Discord) {
        const sendList = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle("List of all the commands")
            .setDescription('To have more information about a command, use `%<command> ?`.')
            .addField('Commands with no permissions needed.', "`avatar`, `beep`, `boop`, `goto`, `hypixel_bedwars`, `hypixel_duels`, `hypixel_skywars`, `list`, `nasa_apod`, `nasa_epic`, `nasa_insight`, `nasa_mrp`, `party`, `ping`, `play`, `pong`, `report`, `return`, `say`, `send`, `test`, `youtube`", false)
            .addField('Commands requiring BotPL3', "`exit`, `hypixel_api`, `mute`, `nasa_api`, `purge`, `reload`, `stop`, `unmute`", false)
            .addField('Commands requiring BotPL2', "`kick`, `lockdown`", false)
            .addField('Commands requiring BotPL1', "`ban`", false)
            .addField('Commands requiring BotPL0', "none", false)
            .addField('Commands for the server owner', "`friend`", false)
            .setFooter('There are currently 37 command files.')

        message.channel.send(sendList)
    }
}
