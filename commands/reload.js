module.exports = {
    name: 'reload',
    cooldown: 10,
    description: 'Usage: "%reload"',
    execute(message, args, cmd, client, Discord){

    // Set the client user's activity
    client.user.setActivity('for "%"', { type: 'WATCHING' });
    //client.user.setActivity();

    const reloadedBot = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Reload')
    .setDescription(`Reloaded the bot.`)

    message.channel.send(reloadedBot)
    }
}