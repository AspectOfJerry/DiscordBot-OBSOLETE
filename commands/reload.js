module.exports = {
    name: 'reload',
    aliases: ['update', 'rel'],
    cooldown: 10,
    description: 'Usage: "%reload"',
    execute(message, args, cmd, client, Discord){

    //Set the client user's activity
    //client.user.setActivity('bedwars chill', { type: 'STREAMING', url: "https://www.twitch.tv/jioyww"}).catch(console.error);
    //client.user.setActivity('for "%"', { type: 'WATCHING' });
    client.user.setActivity();

    const reloadedBot = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Reload')
        .setDescription(`Reloaded the bot.`)
        .setFooter(`message.content = ${message.content}`)

    message.channel.send(reloadedBot)
    }
}