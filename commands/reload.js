module.exports = {
    name: 'reload',
    aliases: ['update', 'rel'],
    cooldown: 10,
    description: 'Usage: "%reload"',
    execute(message, args, cmd, client, Discord){

        if(message.member.roles.cache.find(role => role.name === 'BotPL3')){
            //Set the client user's activity
            client.user.setActivity('Something', { type: 'STREAMING', url: "https://www.twitch.tv/jioyww"}).catch(console.error);
            //client.user.setActivity('for "%"', { type: 'WATCHING' });
            //client.user.setActivity();

            const reloadedBot = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Reload')
                .setDescription(`Reloaded the bot.`)
                .setFooter(`message.content = ${message.content}`)

            message.channel.send(reloadedBot)
        } else{
            const permissionsError = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Permissions error 0x5(5)')
            .setDescription("I'm sorry but you do **not** have the **permissions** to perform this command. Please contact the server administrators if you believe that this is an error.")
            .setFooter(`message.content = ${message.content}`)

        message.channel.send(permissionsError)
        }
    }
}