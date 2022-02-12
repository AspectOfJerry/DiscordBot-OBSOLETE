module.exports = {
    name: 'report',
    aliases: ['wdr', 'wdreport', 'watchdogreport', 'chatreport', 'ct'],
    description: 'Usage: "%report <@user> <reason>"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%report command help')
                .setDescription('This command reports the mentioned user to staff (must include the reason).')
                .addField(`Usage`, "`%report` `<@user>` `<reason>`", true)
                .addField(`Aliases`, "`wdr`, `wdreport`, `watchdogreport`, `chatreport`, `ct`", true)
                .addField("Stats for nerds", "Lines: `70`; File size: `~3.8` KB", false)
                .setFooter("This command was inspired from Hypixel's reporting system.")

            message.channel.send(helpCommand)
            return;
        }
        //Code
        const target = message.mentions.users.first();
        if(!args[0]) {
            const errorRequireArgs0 = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('You must mention a member to report!')

            message.channel.send(errorRequireArgs0)
        } else {
            if(target) {
                const memberTarget = message.guild.members.cache.get(target.id);
                if(args[1]) {
                    const sendSuccessReport = new Discord.MessageEmbed()
                        .setColor('00ff00')
                        .setDescription(`<@${message.member.user.id}> reported <@${memberTarget.user.id}>`)
                        .setFooter('Thanks for your report. We understand your concerns and it will be reviewed as soon as possible.')

                    message.channel.send(sendSuccessReport)
                    const sendReportContent = new Discord.MessageEmbed()
                        .setColor('00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Report submitted')
                        .setDescription(`<@${message.member.user.id}> reported <@${memberTarget.user.id}>`)
                        .addField(`Reason:`, `${args.join(" ")}`, false)
                        .setFooter('Thanks for your report. We understand your concerns and it will be reviewed as soon as possible.')

                    message.guild.channels.cache.find(channel => channel.name.includes('staff-chat')).send(`<@&697914535863910561>, <@&642107004076163103>, <@&631943246095974400>, <@&802349057112670278>`)
                    message.guild.channels.cache.find(channel => channel.name.includes('staff-chat')).send(sendReportContent)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(sendReportContent)
                } else {
                    const requireArgs1 = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription('You must provide a reason for the report')

                    message.channel.send(requireArgs1)
                }
            } else {
                const errorTarget = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription('Unknown user')

                message.channel.send(errorTarget)
            }
        }
    }
}
