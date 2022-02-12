module.exports = {
    name: 'dcrc',
    description: 'Usage: "%dcrc"',
    execute(message, args, cmd, client, Discord) {
        if(message.member.user.id !== '611633988515266562') {
            const errorNoPermissions = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(errorNoPermissions)
            return;
        }
        if(!message.member.voice.channel) {
            const errorMustBeInVC = new Discord.MessageEmbed()
                .setColor('ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('error: You must be in a voice channel to use this command.')

            message.channel.send(errorMustBeInVC)
            return;
        }
        //Save current channelID
        const currentChannel = message.member.voice.channelID
        //setChannel to #temp
        message.member.voice.setChannel('933168680085360690')
            .then(() => {
                //Go back to old channel
                message.member.voice.setChannel(currentChannel)
                const successDCRC = new Discord.MessageEmbed()
                    .setColor('00ff00')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription('success: DCRC')

                message.channel.send(successDCRC)
            })
    }
}
