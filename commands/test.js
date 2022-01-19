module.exports = {
    name: 'test',
    description: "Usage: %test",
    execute(message, args, cmd, client, Discord) {
        let memberTarget;
        try {
            const target = message.mentions.users.first();
            memberTarget = message.guild.members.cache.get(target.id);
        } catch(error) {
            const noTargetNorMemberTarget = new Discord.MessageEmbed()
                .setColor('#ffff00')
                .setDescription('Catch line 8. `memberTarget` is undefined')

            message.channel.send(noTargetNorMemberTarget)
        }
        const testMessage = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setDescription('Testing...')
        message.channel.send(testMessage)
        //message.reply('There is currently nothing to test!');
        //Code













        //TO IMPLEMENT LATER (Function to check roles)
        //return 0 = Cannot execute, role order
        //return 1 = Can execute
        //return 2 = Cannot execute, immune
        // if(checkPermissionMaxBotPL3() == '0'){
        //     message.channel.send('role error uioahjdiuwad')
        // } else if(checkPermissionMaxBotPL3 == '2'){
        //     message.channel.send('immune oiajwdoiawjoidjawiod')
        // }
        // function checkPermissionMaxBotPL3(){
        //     if(message.member.roles.cache.has(role => role.name == 'BotPL0')){
        //         if(memberTarget.roles.cache.has(role => role.name == 'Bots')) {
        //             return 2
        //         }
        //         else if(memberTarget.roles.cache.find(role => role.name === 'BotPL0')) {
        //             return 0;
        //         }
        //     }
        // }

    }
}
