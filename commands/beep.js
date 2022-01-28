module.exports = {
    name: 'beep',
    description: 'Usage: "%beep"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const commandHelp = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setTitle('%beep command help')
                .setDescription('Usage: %beep')
                .setFooter('This command is not case-sensitive.')

            message.channel.send(commandHelp)
            return;
        }
        //code

        const beep = new Discord.MessageEmbed()
            .setColor('#ff55ff')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('Boop!')

        message.channel.send(beep)
    }
}
