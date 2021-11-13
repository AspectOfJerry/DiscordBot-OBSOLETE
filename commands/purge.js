module.exports = {
    name: 'purge',
    aliases: ['cls', 'clear', 'delete', 'del', 'erase'],
    description: 'Usage: "%purge <value>"',
    async execute(message, args, cmd, client, Discord) {
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')) { //BotP R3
            if(cmd === 'cls') {
                if(message.channel.name.includes("terminal")) {
                    cls(message, args, cmd, client, Discord)
                    return;
                } else {
                    const terminalOnly = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription('You can only use this command in #terminal')

                    message.channel.send(terminalOnly)
                    return;
                }
            }
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You must enter a value!")
                .setFooter(`%purge "<args[0]>"`)
            const Args0IsNaN = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("The value must be a whole number between 1 and 25!")
                .setFooter(`%purge "<args[0]>"`)
            const requireArgs0Is1To25 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You can only delete 1 to 25 messages at once")
                .setFooter(`%purge "<args[0]>"`)
            const requireArgsGreater = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You must delete at least one message!")
                .setFooter(`%purge "<args[0]>"`)

            if(!args[0]) return message.reply(requireArgs0);
            if(isNaN(args[0])) return message.reply(Args0IsNaN);
            if(args[0] > 25) return message.reply(requireArgs0Is1To25);
            if(args[0] < 1) return message.reply(requireArgsGreater);

            await message.channel.messages.fetch({limit: args[0]}).then(messages => {
                try {
                    message.channel.bulkDelete(messages).catch(console.error);
                } catch(error) {
                    const errorCatch = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error Catch')
                        .setDescription(`An error occured while trying to purge ${args[0]} messages`)
                        .setFooter(`An error was caught on line 40:19\nmessage.content = ${message.content}`)

                    message.channel.send(errorCatch)
                }
                const userPurgedMessages = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('User Purged Messages')
                    .setDescription(`<@${message.member.user.id}> purged ` + args[0] + ` messages in ${message.channel}`)

                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userPurgedMessages)
            });
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
const cls = async (message, args, cmd, client, Discord) => {
    await message.channel.messages.fetch({limit: 64}).then(messages => {
        message.channel.bulkDelete(messages).catch(console.error);
        const terminal = new Discord.MessageEmbed()
            .setColor('#0c0c0c')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle("Jerry's Bot#0182/>")
            .setDescription('Node.js v16.9.1 >_')

        message.channel.send(terminal)
    })
}
