module.exports = {
    name: 'report',
    aliases: ['wdr', 'wdreport', 'watchdogreport', 'chatreport', 'flag'],
    description: 'Usage: "%report <@user> <reason>"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const commandHelp = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setTitle('%report command help')
                .setDescription('Usage: %report <@user> <reason>')

            message.channel.send(commandHelp)
        }
        //code
        const target = message.mentions.users.first();
        if(!args[0]) {
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You must mention a member to report!')

            message.channel.send(requireArgs0)
        } else {
            if(target) {
                const memberTarget = message.guild.members.cache.get(target.id);
                if(args[1]) {
                    const report = new Discord.MessageEmbed()
                        .setColor('00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Report submitted')
                        .setDescription(`<@${message.member.user.id}> reported <@${memberTarget.user.id}>`)
                        .addField(`Reason:`, `${args.join(" ")}`, false)
                        .setFooter('Thanks for your report. We understand your concerns and it will be reviewed as soon as possible.')

                    message.channel.send(report)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(`<@&697914535863910561>, <@&642107004076163103>`)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(report)
                } else {
                    const requireArgs1 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription('You must provide a reason for the report')

                    message.channel.send(requireArgs1)
                }
            } else {
                const targetError = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription('Unknown user')

                message.channel.send(targetError)
            }
        }
    }
}
