module.exports = {
    name: 'say',
    description: 'Usage: "%say <message>"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const HELP_COMMAND = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%say command help')
                .setDescription('This command sends a message in the current channel.')
                .addField('Usage', '`%say` `<message>`', false)
                .addField('Related commands', '`%send`')
                .addField("Stats for nerds", "Lines: `39`; File size: `~1.45` KB", false)
                .setFooter('This command is case-insensitive.');

            message.channel.send(HELP_COMMAND)
            return;
        }
        //Checks
        if(!args[0]) {
            const ERROR_REQUIRE_ARGS_0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You must enter a message to say');

            message.channel.send(ERROR_REQUIRE_ARGS_0);
            return;
        }
        //Declaring variables
        let messageSend
        //Code
        messageSend = args.join(" ");

        message.channel.bulkDelete(1).catch(console.error)
        message.channel.send(messageSend);
    }
}
