module.exports = {
    name: 'exit',
    description: 'Usage: "%exit"',
    execute(message, args, cmd, client, Discord) {
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')) { //BotP R3
            if(message.channel.name.includes("terminal")) {
                exit(message, args, cmd, client, Discord)
            } else {
                const terminalOnly = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('You can only use this command in #terminal')

                message.channel.send(terminalOnly)
                return;
            }
        }
    }
}
const exit = (message, args, cmd, client, Discord) => {
    message.channel.delete('Reset terminal')
    message.guild.channels.create("🧾terminal", {
        type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
        permissionOverwrites: [
            {
                id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
                deny: ['SEND_MESSAGES'] //Deny permissions
            },
        ],
    })
        .then(channel => {
            channel.setParent('631939549332897843')
            const terminal = new Discord.MessageEmbed()
                .setColor('#0c0c0c')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle("Jerry's Bot#0182/>")
                .setDescription('>_')

            channel.send(terminal)
        })
}