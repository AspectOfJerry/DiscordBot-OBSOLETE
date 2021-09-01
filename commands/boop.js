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
            const userNotFound = new Discord.MessageEmbed()
            .setColor('#800080')
            .setDescription('You must mention a valid user to "Boop!"')
            .setFooter('Usage: "%boop <@user>"')

            message.channel.send(userNotFound)
        }
    }
}