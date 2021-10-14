module.exports = {
    name: 'test',
    description: "Usage: %test",
    execute(message, args, cmd, client, Discord) {
        try {
            const target = message.mentions.users.first();
            const memberTarget = message.guild.members.cache.get(target.id);
        } catch(error) {
            const noTargetNorMemberTarget = new Discord.MessageEmbed()
                .setColor('#ffff00')
                .setDescription('Catch line 8. No `memberTarget`')

            message.channel.send(noTargetNorMemberTarget)
        }
        const testMessage = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setDescription('Testing...')
        message.channel.send(testMessage)
        message.reply('There is currently nothing to test!');
        //Code
    }
}