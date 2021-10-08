module.exports = {
    name: 'boop',
    description: 'Usage: "%boop <@user>"',
    execute(message, args, cmd, client, Discord) {
        const target = message.mentions.users.first();
        if(!args[0]) {  //If 'args[0]' is missing
            const boopSelf = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Boop!')

            message.channel.send(boopSelf)
        } else {    //if(args[0])
            if(target) { //If 'target' is valid
                const memberTarget = message.guild.members.cache.get(target.id);
                const boop = new Discord.MessageEmbed()
                    .setColor('#ff55ff')
                    .setThumbnail(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`Boop! <@${memberTarget.user.id}>`)

                message.channel.send(boop);
            } else {    //if(!target)
                const targetError = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error')
                    .setDescription('The targeted member is invalid')
                    .setFooter(`%boop <args[0]>\n                 ^targetError`)

                message.channel.send(targetError)
            }
        }
    }
}