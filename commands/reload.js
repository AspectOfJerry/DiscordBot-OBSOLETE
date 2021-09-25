module.exports = {
    name: 'reload',
    aliases: ['update', 'rel'],
    cooldown: 10,
    description: 'Usage: "%reload"',
    execute(message, args, cmd, client, Discord) {

        if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {
            //Set the client user's activity
            client.user.setActivity('Something', {type: 'STREAMING', url: "https://www.twitch.tv/jiooy"}).catch(console.error);
            //client.user.setActivity('for "%"', { type: 'WATCHING' });
            //client.user.setActivity();

            const reloadedBot = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Reload')
                .setDescription(`Reloaded the bot.`)

            message.channel.send(reloadedBot)
        } else {
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}