module.exports = {
    name: 'test',
    cooldown: 10,
    description: "Usage: %test",
    execute(message, args, cmd, client, Discord) {
        try{
            const target = message.mentions.users.first();
            const memberTarget = message.guild.members.cache.get(target.id);
        } catch(error){

        }

        const testMessage = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setDescription('Testing')
        message.channel.send(testMessage)
        //message.reply('There is currently nothing to test!');
        //Code
        //if(memberTarget.roles.cache.find(role => role.name.includes('bot'))) {
            const test = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setDescription('Test message')

        message.guild.channels.cache.get('890067108287873094').send(test)
    }
}