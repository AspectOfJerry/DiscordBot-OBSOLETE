module.exports = {
    name: 'test',
    description: "Usage: %test",
    execute(message, args, cmd, client, Discord) {
        let memberTarget;
        try {
            const target = message.mentions.users.first();
            memberTarget = message.guild.members.cache.get(target.id);
        } catch(error) {
            const noTargetNorMemberTarget = new Discord.MessageEmbed()
                .setColor('#ffff00')
                .setDescription('Catch line 8. `memberTarget` is undefined')

            message.channel.send(noTargetNorMemberTarget)
        }
        const testMessage = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setDescription('Test')
        message.channel.send(testMessage)
        //Code
        
    }
}
