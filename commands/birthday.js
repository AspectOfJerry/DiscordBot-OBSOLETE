module.exports = {
    name: 'birthday',
    aliases: ['bday'],
    cooldown: 10,
    description: 'Usage: "%birthday <@user>"',
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.has('869995421794193518')){ //BotP R3
            const target = message.mentions.users.first();
            const memberTarget = message.guild.members.cache.get(target.id);
            let birthdayRole = message.guild.roles.cache.get('876456209895534653');
    
            const birthday = new Discord.MessageEmbed()
            .setColor('#E91E63')
            .setTitle('Birthday!')
            .setDescription (`Happy birthday <@${memberTarget.user.id}>!`)
            .setFooter('We wish them a happy birthday!')
    
            memberTarget.roles.add(birthdayRole.id);
            message.guild.channels.cache.get('854475028027801640').send(birthday)
            message.guild.channels.cache.get('857978482374344734').send(birthday)
            message.guild.channels.cache.get('857982855644446730').send(birthday)
            message.guild.channels.cache.get('858100435768049684').send(birthday)
            message.guild.channels.cache.get('812701440576454676').send(birthday)
        }
        else{
            const permissionsTooLow = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Error 403: "' + message.content + '"')
            .setDescription("I'm sorry but you do **not** have the __permissions__ to **perform** this __command__. Please contact the server administrators if you believe that this is an error.")
            .setFooter('403 FORBIDDEN')

            message.channel.send(permissionsTooLow)
        }
    }
}