module.exports = {
    name: 'altf4',
    aliases: ['alt-f4', 'alt_f4'],
    cooldown: 10,
    description: 'Usage: "%altf4"',
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.find(role => role.name === 'BotPL1')){ //BotPL1
            const terminatingProcess = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Terminating Process')
                .setDescription(`<@${message.member.user.id}> requested a bot **shutdown**. **Process will be killed after the next message!**`)
                .setFooter('Next:\nmessage.channel.send(processExit)\n.then(() => process.exit(0));')

            const processExit = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setDescription(`Exiting process with code 0(0x0)`)
                .setFooter('.then(() => process.exit(0));')

            const status = new Discord.MessageEmbed()
                .setColor('ff0000')
                .setTitle('Bot shutdown 0x0(0)')
                .setDescription('A user stopped the bot')
                .setFooter('0(0x0) ERROR_SUCCESS')

            message.channel.send(terminatingProcess)
            message.guild.channels.cache.find(channel => channel.name.includes('status')).send(status)
            client.user.setActivity('process.exit(0);', { type: 'PLAYING' })
            message.channel.send(processExit)
            .then(() => process.exit(0));
        }
        else{
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permissions error 0x5(5)')
                .setDescription("I'm sorry but you do **not** have the **permissions** to perform this command. Please contact the server administrators if you believe that this is an error.")
                .setFooter(`message.content = ${message.content}\n5(0x5) ERROR_ACCESS_DENIED`)

            message.channel.send(permissionsError)
        }
    }
}