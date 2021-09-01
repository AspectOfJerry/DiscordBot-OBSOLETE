module.exports = {
    name: 'party',
    aliases: ['p'],
    cooldown: 5,
    description: 'Usage: "%party <@user>"',
    execute(message, args, cmd, client, Discord){
        const target = message.mentions.users.first();

        const requireArgs0 = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Error: "' + message.content + '"')
        .setDescription("Invalid command! You must __add__ or __remove__ a user! Correct usage: %party <invite/kick> <@user>.")
        
        if(!args[0]) return message.channe.send(requireArgs0)

        
    }
}