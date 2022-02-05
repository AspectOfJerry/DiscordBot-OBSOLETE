module.exports = {
    name: 'return',
    description: 'Usage: "%return (<0, 1, 2>)"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setTitle('%return command help')
                .setDescription('This command moves you to one of the Public voice channels (default is 0)')
                .addField('Usage', "%return (`<0, 1, 2>`) (`<@user, all>`)")
                .setFooter('This command is not case-sensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Declaring variables
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
        const errorTargetMustBeInVC = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('error: The target must be in a voice channel for you to use this command')
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
        //Code
        if(args[1] == 'all') {
            if(args[0] == '0') {
                //move memberTarget to public 0

            } else if(args[0] == '1') {
                //move memberTarget to public 1

            } else if(args[0] == '2') {
                //move memberTarget to public 2

            } else {
                message.channel.send(errorArgs0)

            }
        } else if(args[1]) {
            const target = message.mentions.users.first();
            if(!target) {
                message.channel.send(errorTarget)
                return;
            }
            const memberTarget = message.guild.members.cache.get(target.id);
            //IF memberTarget is not in a voice channel, send error message; return;

            if(args[0] == '0') {
                //move memberTarget to public 0

            } else if(args[0] == '1') {
                //move memberTarget to public 1

            } else if(args[0] == '2') {
                //move memberTarget to public 2

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
