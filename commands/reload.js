module.exports = {
    name: 'reload',
    aliases: ['update', 'rel', 'r', 'u', 'rs'],
    description: 'Usage: ",reload"',
    execute(message, args, cmd, client, Discord) {


        //Set the client user's activity
        client.user.setActivity('with jiooy', {type: 'STREAMING', url: "https://www.twitch.tv/jiooy"}).catch(console.error);
        //client.user.setActivity('', { type: 'WATCHING' });
        //client.user.setActivity();

        const reloadedBot = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Reload')
            .setDescription(`Reloaded the bot.`)

        message.channel.send(reloadedBot)
    }
}
