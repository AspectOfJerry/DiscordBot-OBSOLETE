module.exports = {
    name: 'test',
    description: "Usage: ,test",
    execute(message, args, cmd, client, Discord) {
        const target = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(target.id);
        const testMessage = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setTitle('Test')
            .setDescription('The next messages are for testing.')
        message.channel.send(testMessage)
        message.reply('There is currently nothing to test!');
        //Code

    }
}