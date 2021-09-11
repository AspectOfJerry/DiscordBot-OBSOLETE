const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'report',
    cooldown: 10,
    description: 'Usage: "%report <@user>"',
    execute(message, args, cmd, client, Discord){
        const target = message.mentions.users.first();
        
        if(args[0]){
            if(target){
                const memberTarget = message.guild.members.cache.get(target.id);
                if(args[1]){
                    const report =  new Discord.MessageEmbed()
                        .setColor('00ff00')
                        .setTitle('Report submitted')
                        .setDescription(`<@${message.member.user.id}> reported <@${memberTarget}>`)
                        .addField(`Report:`, `${message.content}`, false)
                        .setFooter('Thanks for reporting. Your report will be viewed as soon as possible\nDo not report for no reason since it pings staff members.') 

                    message.channel.send(report)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(`<@697914535863910561>, <@642107004076163103>`)
                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(report)
                }
                else{
                    const requireArgs1 =  new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Error')
                        .setDescription('You must provide a reason.')
                        .setFooter(`message.content = ${message.content}\n%report <args[0]> <args[1]>\n                                       ^`)

                    message.channel.send(requireArgs1)
                }
            }
            else{
                const targetError = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error 0x56B(1387)')
                    .setDescription('The targeted member is invalid!')
                    .setFooter(`message.content = ${message.content}\n%report <args[0]> <args[1]>\n                   ^\n1387(0x56B) ERROR_NO_SUCH_MEMBER`)

                message.channel.send(targetError)
            }
        }
        else{
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Error')
                .setDescription("Invalid command! You must mention a user!")
                .setFooter(`message.content = ${message.content}\n%report <args[0]> <args[1]>\n                   ^`)

            message.channel.send(requireArgs0)
        }
    }
}