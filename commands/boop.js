module.exports = {
    name: 'boop',
    cooldown: 5,
    description: 'Usage: "%boop <@user>"',
    execute(message, args, cmd, client, Discord){
        const target = message.mentions.users.first();
        if(!args[0]){
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('You must mention a member')
                .setFooter(`%boop <args[0]>\n                 ^requireArgs0`)

             message.channel.send(requireArgs0)
        } else{
            if(target){ //If 'target' is valid
                const memberTarget = message.guild.members.cache.get(target.id);
                const boop = new Discord.MessageEmbed()
                    .setColor('#ff55ff')
                    .setDescription(`Boop! <@${memberTarget.user.id}>`)
                
                message.channel.send(boop);
            } else{
                const targetError = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('The targeted member is invalid')
                    .setFooter(`%boop <args[0]>\n                 ^targetError`)
                    
                message.channel.send(targetError)
            }
        }
    }
}