module.exports = {
    name: 'party',
    aliases: ['p'],
    description: 'Usage: "%party <@user>"',
    execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const commandHelp = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setTitle('%party command help')
                .setdescription('%party <action> <@user>')
                .addField('invite', 'Invited a played in the party')
                .setFooter('This command is not case-sensitive.')

            message.channel.send(commandHelp)
            return;
        }
        //code

        message.channel.send('This command is currently under development.'); return;
        let target = message.mentions.users.first();
        let inviter = message.member.user.id;


    }
}
