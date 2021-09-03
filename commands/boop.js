module.exports = {
    name: 'boop',
    cooldown: 5,
    description: 'Usage: "%boop <@user>"',
    execute(message, args, cmd, client, Discord){
        const target = message.mentions.users.first();

        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);

            const boop = new Discord.MessageEmbed()
            .setColor('#ff55ff')
            .setDescription(`Boop! <@${memberTarget.user.id}>`)
            
            message.channel.send(boop);
        }
        else{
            const targetError = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('The targeted member is invalid!')
            .setFooter(`message.content = ${message.content}`)
            
            message.channel.send(targetError)
        }
    }
}