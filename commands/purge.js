module.exports = {
    name: 'purge',
    aliases: ['clear', 'delete', 'del', 'erase', 'cls'],
    description: 'Usage: ",purge <value>"',
    async execute(message, args, cmd, client, Discord) {


        if(message.member.roles.cache.has('908099650156892191') || message.member.roles.cache.has('908095045461225490')) { //If 'message.member' has the role 'staff'
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
            const Args0IsNaN = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("The value must be a whole number between 1 and 25!")
            const requireArgs0Is1To32 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You can only delete 1 to 32 messages at once")
            const requireArgsGreater = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You must delete at least one message!")

            if(!args[0]) return message.reply(requireArgs0);
            if(isNaN(args[0])) return message.reply(Args0IsNaN);
            if(args[0] > 32) return message.reply(requireArgs0Is1To32);
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
                        .setFooter(`An error was caught on line 68:19\nmessage.content = ${message.content}`)

                    message.channel.send(errorCatch)
                }
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
            .setTitle("goldfish bot#2895/>")
            .setDescription('Node.js v16.9.1 >_')
            .setFooter('",exit", ",cls"')

        message.channel.send(terminal)
    })
}
