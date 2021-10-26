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
                .setDescription('Catch line 8. `memberTarget` is undefined')

            message.channel.send(noTargetNorMemberTarget)
        }
        const testMessage = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setDescription('Testing...')
        message.channel.send(testMessage)
        //message.reply('There is currently nothing to test!');
        //Code
        const test = new Discord.MessageEmbed()
            .setTitle('Title')
            .stDescription('Description')
            .addField(`Field 1 title`, `Field 1 value, true`, true)
            .addField(`Field 2 title`, `Field 2 value, true`, true)
            .addField(`Field 3 title`, `Field 3 value, false`, false)
            .addField(`Field 4 title`, `Field 4 value, true`, true)
            .addField(`Field 5 title`, `Field 5 value, true`, true)
            .addField(`Field 6 title`, `Field 6 value, true`, true)
            .addField(`Field 7 title`, `Field 7 value, true`, true)
            .setFooter('Footer')

        message.channel.send(test)
    }
}