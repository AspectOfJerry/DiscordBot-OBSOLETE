module.exports = {
    name: 'reload',
    aliases: ['update', 'rel', 'rs'],
    description: 'Usage: "%reload"',
    async execute(message, args, cmd, client, Discord) {
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {
            //Declaring variables
            const reloadingBot = new Discord.MessageEmbed()
                .setColor('#ffff00')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('Reloading the bot...')
            const reloadedBot = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription(`Finished reloading!`)
            //Code
            message.channel.send(reloadingBot)


            await message.channel.send(reloadedBot)
        } else {
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}
