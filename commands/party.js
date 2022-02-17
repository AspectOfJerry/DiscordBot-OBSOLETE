module.exports = {
    name: 'party',
    aliases: ['p'],
    description: 'Usage: "%party <@user>"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const HELP_COMMAND = new Discord.MessageEmbed()
            //     .setColor('0000ff')
            //     .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            //     .setTitle('%pârty command help')
            //     .addField("Stats for nerds", "Lines: ; File size: ~ KB", false)
            //     .setFooter('')

            // message.channel.send(HELP_COMMAND)
            message.reply('The help feature is under development for this command.')
            return;
        }
        //Declairing variables
        const errorSenderNotInVC = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('You must be in a voice channel to perform this command.')
        const errorTargetNotInVC = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('The targeted member must be in a voice channel.')
        const sendPartyInvite = new Discord.MessageEmbed()
            .setColor('00fff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('')
        const sendAddedInParty = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription('')


        //Code
        message.reply('This command is currently under development.'); return;
        let target = message.mentions.users.first();
        let inviter = message.member.user.id;

        if(!target){
            const targetError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription('Unknown member')

            message.channel.send(targetError)
            return;
        }
        if(!args[0]) {
            message.channel.send('You must specify an action to perform.')
            return;
        }

        if(args[1].toUpperCase() == 'ADD') {
            if(!inviter.voiceChannel) {
                message.channel.send(errorJoinVoiceChannel)
            }
        }
        

        const memberTarget = message.guild.members.cache.get(target.id);
    }
}
