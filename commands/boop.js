module.exports = {
    name: 'boop',
    cooldown: 5,
    description: 'Usage: "%boop <@user>"',
    execute(message, args, cmd, client, Discord){
        const target = message.mentions.users.first();
        if(target){ //If 'target' is valid
            const memberTarget = message.guild.members.cache.get(target.id);
            const boop = new Discord.MessageEmbed()
            .setColor('#ff55ff')
            .setDescription(`Boop! <@${memberTarget.user.id}>`)
            
            message.channel.send(boop);
        } else{
            const targetError = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error 0x56B(1387)')
            .setDescription('The targeted member is invalid!')
            .setFooter(`message.content = ${message.content}\n%boop <args[0]>\n                 ^\n1387(0x56B) ERROR_NO_SUCH_MEMBER`)
            
            message.channel.send(targetError)
        }
    }
}