module.exports = {
    name: 'return',
    description: 'Usage: "%return (<0, 1, 2>)"',
    aliases: ['ret', 'r'],
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setTitle('%return command help (BotPL3)')
                .setDescription('This command moves you, a user or all users to one of the Public voice channels (default is 0)')
                .addField('Usage', "%return (`<0, 1, 2>`) (`<@user, all>`)", true)
                .addField('Aliases', "`ret`, `r`", true)
                .addField('Related commands', "`goto`, `disconnect`", false)
                .addField("Stats for nerds", "Lines: `170`; File size: `~8.65` KB", false)
                .setFooter('This command is case-insensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Declaring variables
        let memberTarget
        const errorArgs0 = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('error: You must enter a valid Public channel number: `0`, `1`, `2`.')
        const errorMustBeInVC = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('error: You must be in a voice channel to use this command')
        const errorTarget = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('Unknown user')
        const successMoveToPublic0 = new Discord.MessageEmbed()
            .setColor('00ff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`Moved <@${message.member.user.id}> to <#778356209534631946>.`)
        const successMoveToPublic1 = new Discord.MessageEmbed()
            .setColor('00ff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription(`Moved <@${message.member.user.id}> to <#778356257534377984>.`)
        const successMoveToPublic2 = new Discord.MessageEmbed()
            .setColor('00ff00')
            .setDescription(`Moved <@${message.member.user.id}> to <#933168680085360690>.`)
        //Checks
        if(!message.member.roles.cache.find(role => role.name === 'BotPL3')) {
            const errorNoPermissions = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(errorNoPermissions)
            return;
        }
        //Code
        if(args[1] == 'all') {
            if(args[0] == '0') {
                //move all to public 0
                message.member.voice.channel.members.forEach((member) => {
                    const successMoveToPublic0 = new Discord.MessageEmbed()
                        .setColor('00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`Moved ${member} to <#778356209534631946>.`)

                    member.voice.setChannel('778356209534631946')
                    message.channel.send(successMoveToPublic0)
                })
            } else if(args[0] == '1') {
                //move all to public 1
                message.member.voice.channel.members.forEach((member) => {
                    const successMoveToPublic1 = new Discord.MessageEmbed()
                        .setColor('00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`Moved ${member} to <#778356257534377984>.`)

                    member.voice.setChannel('778356257534377984')
                    message.channel.send(successMoveToPublic1)
                })
            } else if(args[0] == '2') {
                //move all to public 2
                message.member.voice.channel.members.forEach((member) => {
                    const successMoveToPublic0 = new Discord.MessageEmbed()
                        .setColor('00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                        .setDescription(`Moved ${member} to <#933168680085360690>.`)

                    member.voice.setChannel('933168680085360690')
                    message.channel.send(successMoveToPublic0)
                })
            } else {
                message.channel.send(errorArgs0)

            }
        } else if(args[1]) {
            const target = message.mentions.users.first();
            if(!target) {
                message.channel.send(errorTarget)
                return;
            }
            memberTarget = message.guild.members.cache.get(target.id);
            //IF memberTarget is not in a voice channel, send error message; return;
            if(!memberTarget.voice.channel) {
                const errorTargetNotInVC = new Discord.MessageEmbed()
                    .setColor('ff0000')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`error: <@${memberTarget.user.id}> must be in a voice channel for you to use this command.`)

                message.channel.send(errorTargetNotInVC)
                return;
            }
            if(args[0] == '0') {
                //move memberTarget to public 0
                const successMoveToPublic0 = new Discord.MessageEmbed()
                    .setColor('00ff00')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`Moved ${memberTarget} to <#778356209534631946>.`)

                memberTarget.voice.setChannel('778356209534631946')
                message.channel.send(successMoveToPublic0)
            } else if(args[0] == '1') {
                //move memberTarget to public 1
                const successMoveToPublic1 = new Discord.MessageEmbed()
                    .setColor('00ff00')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`Moved ${memberTarget} to <#778356257534377984>.`)

                memberTarget.voice.setChannel('778356257534377984')
                message.channel.send(successMoveToPublic1)
            } else if(args[0] == '2') {
                //move memberTarget to public 2
                const successMoveToPublic0 = new Discord.MessageEmbed()
                    .setColor('00ff00')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`Moved ${memberTarget} to <#933168680085360690>.`)

                memberTarget.voice.setChannel('933168680085360690')
                message.channel.send(successMoveToPublic0)
            } else {
                message.channel.send(errorArgs0)
            }
        } else {
            //IF message.member is not in a voice channel, send error message; return;
            if(!message.member.voice.channel) {
                message.channel.send(errorMustBeInVC)
                return;
            }
            if(!args[0]) {
                //move message.memeber to public 0
                message.member.voice.setChannel('778356209534631946')
                message.channel.send(successMoveToPublic0)
            } else if(args[0] == '0') {
                //move message.memeber to public 0
                message.member.voice.setChannel('778356209534631946')
                message.channel.send(successMoveToPublic0)
            } else if(args[0] == '1') {
                //move message.memeber to public 1
                message.member.voice.setChannel('778356257534377984')
                message.channel.send(successMoveToPublic1)
            } else if(args[0] == '2') {
                //move message.memeber to public 2
                message.member.voice.setChannel('933168680085360690')
                message.channel.send(successMoveToPublic2)
            } else {
                message.channel.send(errorArgs0)
            }
        }
    }
}
