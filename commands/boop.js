module.exports = {
    name: 'boop',
    cooldown: 5,
    description: 'Usage: "%boop <@user>"',
    execute(message, args, cmd, client, Discord) {
        const target = message.mentions.users.first();
        if(!args[0]) {
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription('You must mention a member')

            message.channel.send(requireArgs0)
        } else {
            if(target) { //If 'target' is valid
                const memberTarget = message.guild.members.cache.get(target.id);
                const boop = new Discord.MessageEmbed()
                    .setColor('#ff55ff')
                    .setThumbnail(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`Boop! <@${memberTarget.user.id}>`)

                message.channel.send(boop);
            } else {
                const targetError = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error')
                    .setDescription('The targeted member is invalid')

                message.channel.send(targetError)
            }
        }
    }
}