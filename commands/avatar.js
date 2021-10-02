module.exports = {
    name: 'avatar',
    aliases: ['av', 'a'],
    description: 'Usage: "%avatar <@user>"',
    execute(message, args, cmd, client, Discord) {
        const target = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(target.id);
        if(!args[0]) {
            const avatarSelf = new Discord.MessageEmbed()
                .setColor('#ff5eef')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Avatar')
                .setDescription(`Your avatar`)
                .setImage(`${message.author.displayAvatarURL({dynamic: true, size: 1024})}`)
                .setURL(`${message.author.displayAvatarURL({dynamic: true, size: 2048})}`)

            message.channel.send(avatarSelf)
        } else {
            const avatar = new Discord.MessageEmbed()
                .setColor('#ff5eef')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Avatar')
                .setDescription(`<@${memberTarget.user.id}>'s avatar`)
                .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 1024})}`)
                .setURL(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 2048})}`)

            message.channel.send(avatar)
        }
    }
}