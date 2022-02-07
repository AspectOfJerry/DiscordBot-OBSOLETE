module.exports = {
    name: 'say',
    description: 'Usage: "%say <message>"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%say command help')
                .setDescription('This command sends a message in the current channel.')
                .addField('Usage', '`%say` `<message>`', false)
                .addField('Related commands', '`%send`')
                .setFooter('This command is not case-sensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Declaring variables
        let messageSend
        const requireArgs1 = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('You must enter a message to say')
        //Code
        if(!args[0]) {
            message.channel.send(requireArgs1)
        } else {
            messageSend = args.join(" ")

            message.channel.bulkDelete(1).catch(console.error);
            message.channel.send(messageSend)
        }
    }
}
