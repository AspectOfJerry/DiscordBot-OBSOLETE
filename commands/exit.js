module.exports = {
    name: 'exit',
    aliases: ['termial', 'term'],
    description: 'Usage: ",exit"',
    execute(message, args, cmd, client, Discord) {
        if(message.member.roles.cache.find(role => role.name.includes('staf')) || message.member.roles.cache.find(role => role.name.includes('prog'))) {
            if(message.channel.name.includes("terminal")) {
                exit(message, args, cmd, client, Discord)
            } else {
                const terminalOnly = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Error')
                    .setDescription('You can only use this command in #terminal')

                message.channel.send(terminalOnly)
                return;
            }
        } else {
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}   //module.exports    @1:1
const exit = (message, args, cmd, client, Discord) => {
    message.guild.channels.create("terminal", "GUILD_TEXT")
        .then(channel => {
            channel.setParent('890070033575862303')
            setTimeout(() => {channel.setPosition(0)}, 500);
            setTimeout(() => {message.channel.delete('Reset terminal')}, 1000);
            setTimeout(() => {channel.setPosition(2)}, 1500);
            const terminal = new Discord.MessageEmbed()
                .setColor('#0c0c0c')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle("goldfish bot#2895/>")
                .setDescription('Node.js v16.9.1 >_')
                .setFooter('",exit", ",cls"')

            channel.send(terminal)
        })
}
