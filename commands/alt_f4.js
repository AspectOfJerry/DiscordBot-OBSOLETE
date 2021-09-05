module.exports = {
    name: 'altf4',
    aliases: ['alt-f4', 'alt_f4'],
    cooldown: 10,
    description: 'Usage: "%altf4"',
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.find(role => role.name === 'BotPL1')){ //BotPL1
            const alt_f4 = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Terminating Process')
            .setDescription(`${message.member} executed the "alt f4" command which is a faster version of the "%stop" command. **Process will be killed after the next message!**`)
            .setFooter('Next:\nmessage.channel.send(processExit)\n.then(() => process.exit(0));')

            const processExit = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`Exiting process with code 0`)
            .setFooter('.then(() => process.exit(0));')

            message.channel.send(alt_f4)
            client.user.setActivity('.then(() => process.exit(0));', { type: 'PLAYING' })
            message.channel.send(processExit)
            .then(() => process.exit(0));
        }
        else{
            const permissionsError = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Permissions error')
            .setDescription("I'm sorry but you do **not** have the __permissions__ to **perform** this __command__. Please contact the server administrators if you believe that this is an error.")
            .setFooter(`message.content = ${message.content}`)

            message.channel.send(permissionsError)
        }
    }
}