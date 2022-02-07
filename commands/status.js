module.exports = {
    name: 'status',
    aliases: ['activity', 'presence', 'rich-presence', 'rich_presence'],
    description: 'Usage: "%reload"',
    async execute(message, args, cmd, client, Discord) {
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')) {
            //Declaring variables
            let statusType
            let streamURL
            let statusContent
            // const error = new Discord.MessageEmbed()
            //     .setColor('ff0000')
            //     .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            //     .setDescription("error: An error occurred while updating the bot's status.")
            const errorRequireArgs0 = new Discord.MessageEmbed()
                .setColor('ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('error: You must provide a valid status type.')
            const errorArgs0 = new Discord.MessageEmbed()
                .setColor('ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('error: You must enter a valid status type: `PLAYING`, `LISTENING`, `WATCHING`, `STREAMING`.')
            const errorRequireArgs1Streaming = new Discord.MessageEmbed()
                .setColor('ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('error: You must provide a valid Twitch channel link.')
            const errorRequireArgs1 = new Discord.MessageEmbed()
                .setColor('ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('error: You must provite a String to set as status.')
            const errorRequireArgs2 = new Discord.MessageEmbed()
                .setColor('ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('error: You must provide a String to set as status')
            //Code
            if(!args[0]) {
                message.channel.send(errorRequireArgs0)
                return;
            }

            if(args[0].toUpperCase() == 'PLAYING') {
                statusType = "PLAYING";
                if(!args[1]) {
                    message.channel.send(errorRequireArgs1)
                    return;
                }
                args.shift();
                statusContent = args.join(" ")
                client.user.setActivity(`${statusContent}`, {type: statusType}).catch(console.error)
                const successSetStatusPlaying = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Discord Rich Presence status update')
                    .setDescription(`<@${message.member.user.id}> updated the bot's status to "Playing **${statusContent}**"`)

                message.channel.send(successSetStatusPlaying)
            } else if(args[0].toUpperCase() == 'LISTENING') {
                statusType = "LISTENING";
                if(!args[1]) {
                    message.chanmel.send(errorRequireArgs1)
                    return;
                }
                args.shift();
                statusContent = args.join(" ")
                client.user.setActivity(`${statusContent}`, {type: statusType}).catch(console.error)
                const successSetStatusListeningTo = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Discord Rich Presence status update')
                    .setDescription(`<@${message.member.user.id}> updated the bot's status to "Listening to **${statusContent}**"`)

                message.channel.send(successSetStatusListeningTo)
            } else if(args[0].toUpperCase() == 'WATCHING') {
                statusType = "WATCHING";
                if(!args[1]) {
                    message.channel.send(errorRequireArgs1)
                    return;
                }
                args.shift();
                statusContent = args.join(" ")
                client.user.setActivity(`${statusContent}`, {type: statusType}).catch(console.error)
                const successSetStatusWatching = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Discord Rich Presence status update')
                    .setDescription(`<@${message.member.user.id}> updated the bot's status to "Watching **${statusContent}**"`)

                message.channel.send(successSetStatusWatching)

            } else if(args[0].toUpperCase() == 'STREAMING') {
                statusType = "STREAMING"

                if(!args[1]) {
                    message.channel.send(errorRequireArgs1Streaming)

                } else if(!args[1].startsWith('https://www.twitch.tv/')) {
                    message.channel.send(errorRequireArgs1Streaming)

                } else {
                    streamURL = args[1]
                    args.shift()
                    if(!args[1]) {
                        message.channel.send(errorRequireArgs2)
                        return;
                    }
                    args.shift()
                    statusContent = args.join(" ")
                    client.user.setActivity(`${statusContent}`, {type: statusType, url: streamURL}).catch(console.error)
                    const successSetStatusStreaming = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Discord Rich Presence status update')
                        .setDescription(`<@${message.member.user.id}> updated the bot's status to "Streaming **${statusContent}**"`)
                        .addField('Channel link', `${streamURL}`, false)

                    message.channel.send(successSetStatusStreaming)
                }
            } else {
                message.channel.send(errorArgs0)
                return;
            }
        } else {
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}
