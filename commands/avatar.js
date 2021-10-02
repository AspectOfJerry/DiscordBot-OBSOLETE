module.exports = {
    name: 'avatar',
    aliases: ['av', 'a'],
    description: 'Usage: "%avatar <@user>"',
    execute(message, args, cmd, client, Discord) {
        const target = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(target.id);
        if(!args[0]) {
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription('You must mention a member')

            message.channel.send(requireArgs0)
        } else {
            const avatar = new Discord.MessageEmbed()
                .setColor('#ff5eef')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Avatar')
                .setDescription(`<@${memberTarget.user.id}>'s avatar'`)
                .setImage(`${memberTarget.user.displayAvatarURL({dynamic: true, size: 128})}`)

            message.channel.send(avatar)
        }
    }
}