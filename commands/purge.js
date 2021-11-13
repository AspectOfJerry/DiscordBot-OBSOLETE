module.exports = {
    name: 'purge',
    aliases: ['clear', 'delete', 'del', 'erase'],
    description: 'Usage: ",purge <value>"',
    async execute(message, args, cmd, client, Discord) {
        const permissionsError = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Permissions error')
            .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

        if(message.member.roles.cache.has('908099650156892191')) { //If 'message.member' has the role 'staff'
            if(cmd === 'cls') {
                if(!message.member.roles.cache.has('908095045461225490') || !message.member.roles.cache.has('890077893739311154')) {
                    message.channel.send(permissionsError)
                } else {
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
            }
            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You must enter a value!")
            const Args0IsNaN = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("The value must be a whole number between 1 and 25!")
            const requireArgs0Is1To25 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You can only delete 1 to 25 messages at once")
            const requireArgsGreater = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You must delete at least one message!")

            if(!args[0]) return message.reply(requireArgs0);
            if(isNaN(args[0])) return message.reply(Args0IsNaN);
            if(args[0] > 25) return message.reply(requireArgs0Is1To25);
            if(args[0] < 1) return message.reply(requireArgsGreater);

            await message.channel.messages.fetch({limit: args[0]}).then(messages => {
                try {
                    const userPurgedMessages = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('User Purged Messages')
                        .setDescription(`<@${message.member.user.id}> purged ` + args[0] + ` messages in ${message.channel}`)

                    message.channel.bulkDelete(messages).catch(console.error);
                    message.channel.send(userPurgedMessages)
                } catch(error) {
                    const errorCatch = new Discord.MessageEmbed()
                        .setColor('#800080')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error Catch')
                        .setDescription(`An error occured while trying to purge ${args[0]} messages`)
                        .setFooter(`An error was caught on line 68:19\nmessage.content = ${message.content}`)

                    message.channel.send(errorCatch)
                }
            });
        } else {
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
            .setTitle("goldfish bot#2895/>")
            .setDescription('Node.js v16.9.1 >_')

        channel.send(terminal)
    })
}
