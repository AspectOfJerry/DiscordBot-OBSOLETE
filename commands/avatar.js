module.exports = {
    name: 'avatar',
    aliases: ['av', 'a'],
    description: 'Usage: "%avatar <@user>"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
            //     .setColor('0000ff')
            //     .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            //     .setTitle('%avatar command help')
            //     .addField("Stats for nerds", "Lines: ; File size: ~ KB", false)
            //     .setFooter('This command is not case-sensitive.')

            // message.channel.send(helpCommand)
            message.reply('The help feature is under development for this command.')
            return;
        }
        //Code
        if(!args[0]) {
            const sendAvatarSelf = new Discord.MessageEmbed()
                .setColor('#7dc8cd')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Avatar')
                .setDescription(`Your avatar`)
                .setImage(`${message.author.displayAvatarURL({dynamic: true, size: 1024})}`)
                .setURL(`${message.author.displayAvatarURL({dynamic: true, size: 2048})}`)

            message.channel.send(sendAvatarSelf)
        } else {
            const target = message.mentions.users.first();
            const memberTarget = message.guild.members.cache.get(target.id);
            const sendAvatar = new Discord.MessageEmbed()
                .setColor('#7dc8cd')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Avatar')
                .setDescription(`<@${memberTarget.user.id}>'s avatar`)
                .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 1024})}`)
                .setURL(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 2048})}`)

            message.channel.send(sendAvatar)
        }
    }
}
