module.exports = {
    name: 'purge',
    aliases: ['cls', 'clear', 'delete', 'del', 'erase'],
    description: 'Usage: "%purge <value>"',
    async execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%purge command help')
                .setDescription('This comand purges a certain amout of messages (1 to 32).')
                .addField(`Usage`, "`%purge` `<int>`", true)
                .addField(`Aliases`, "`clear`, `delete`, `del`, `erase`", true)
                .addField(`Realted commands`, "`cls` (Clear the terminal and can onlyt be used in the terminal channel)", false)
                .setFooter('This command is not case-sensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Checklsit
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')) { //BotP R3
            if(cmd === 'cls') {
                if(message.channel.name.includes("terminal")) {
                    cls(message, args, cmd, client, Discord)
                    return;
                } else {
                    const errorTerminalOnly = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription('You can only use this command in #terminal')

                    message.channel.send(errorTerminalOnly)
                    return;
                }
            }
            //Declaring variables
            const errorRequireArgs0 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You must enter the number of messages to purge!")
            const errorArgs0IsNaN = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("The value must be an integer between 1 and 32!")
            const errorArgs0Range = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You can only delete 1 to 32 messages at once")
            const errorRequireArgsLeast1 = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("You must delete at least 1 message!")
            //Code
            if(!args[0]) return message.reply(errorRequireArgs0);
            if(isNaN(args[0])) return message.reply(errorArgs0IsNaN);
            if(args[0] > 32) return message.reply(errorArgs0Range);
            if(args[0] < 1) return message.reply(errorRequireArgsLeast1);

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
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }

    }
}
const cls = async (message, args, cmd, client, Discord) => {
    await message.channel.messages.fetch({limit: 64}).then(messages => {
        message.channel.bulkDelete(messages).catch(console.error);
        const sendTerminal = new Discord.MessageEmbed()
            .setColor('#0c0c0c')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle("Jerry's Bot#0182/>")
            .setDescription('Node.js v16.9.1 >_')
            .setFooter('%exit, %cls')

        message.channel.send(sendTerminal)
    })
}
