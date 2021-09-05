module.exports = {
    name: 'birthday',
    aliases: ['bday'],
    cooldown: 10,
    description: 'Usage: "%birthday <@user>"',
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')){ //BotPL3
            const target = message.mentions.users.first();
            if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            let birthdayRole = message.guild.roles.cache.get('876456209895534653');
    
            const birthday = new Discord.MessageEmbed()
            .setColor('#E91E63')
            .setTitle('Birthday!')
            .setDescription (`Happy birthday <@${memberTarget.user.id}>!`)
            .setFooter('We wish them a happy birthday!')
    
            memberTarget.roles.add(birthdayRole.id);
            message.guild.channels.name.cache.find(role => role.name === 'Friend').send(birthday)
            message.guild.channels.cache.get('857978482374344734').send(birthday)
            message.guild.channels.cache.get('857982855644446730').send(birthday)
            message.guild.channels.cache.get('858100435768049684').send(birthday)
            message.guild.channels.cache.get('812701440576454676').send(birthday)                
            }
            else{
                const targetError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('The targeted member is invalid!')
                .setFooter(`message.content = ${message.content}`)

                message.channel.send(targetError)
            }
        }
        else{
            const permissionsError = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Permissions error')
            .setDescription("I'm sorry but you do **not** have the __permissions__ to **perform** this __command__. Please contact the server administrators if you believe that this is an error.")
            .setFooter(`message.content = ${message.content}`)
            
            message.channel.send(permissionsError)
        }
    }
}