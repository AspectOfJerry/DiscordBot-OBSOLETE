module.exports = {
    name: 'deploy',
    aliases: ['setup', 'dep'],
    description: 'Usage: ",reload"',
    execute(message, args, cmd, client, Discord) {
        const deploying = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setDescription(`deploying`)

        message.channel.send(deploying)

        //
        const creatingChannel = new Discord.MessageEmbed()
            .setColor('ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setDescription('Creating text channel...')
        const setttingParentTo = new Discord.MessageEmbed()
            .setColor('ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setDescription('Setting channel parent to `890070033575862303`')
        const settingPositionTo0 = new Discord.MessageEmbed()
            .setColor('ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setDescription('Setting channel position to `0`')
        const settingPositionTo2 = new Discord.MessageEmbed()
            .setColor('ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setDescription('Setting channel position to `2`')

        message.channel.send(creatingChannel)
        message.guild.channels.create("terminal", "GUILD_TEXT")
            .then(channel => {
                message.channel.send(setttingParentTo)
                channel.setParent('890070033575862303')
                setTimeout(() => {channel.setPosition(0)}, 500);
                message.channel.send(settingPositionTo0)
                setTimeout(() => {channel.setPosition(2)}, 1000);
                message.channel.send(settingPositionTo2)
                const terminal = new Discord.MessageEmbed()
                    .setColor('#0c0c0c')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle("goldfish bot#2895/>")
                    .setDescription('Node.js v16.9.1 >_')

                channel.send(terminal)
            })
    }
}
