module.exports = {
    name: 'birthday',
    aliases: ['bday'],
    cooldown: 10,
    description: 'Usage: "%birthday <@user>"',
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')){    //If 'message.member' has the role 'BotPL3'
            const target = message.mentions.users.first();
            if(target){ //If 'target' is valid
                const memberTarget = message.guild.members.cache.get(target.id);
                let birthdayRole = message.guild.roles.cache.get('876456209895534653');
        
                const birthday = new Discord.MessageEmbed()
                    .setColor('#E91E63')
                    .setTitle('Birthday!')
                    .setDescription (`Happy birthday <@${memberTarget.user.id}>!`)
                    .setFooter('We wish them a happy birthday!')
        
                memberTarget.roles.add(birthdayRole.id);    //Give the 'birthdayRole' to 'memberTarget'
                message.guild.channels.name.cache.find(role => role.name === 'Friend').send(birthday)

                message.guild.channels.cache.find(channel => channel.name.includes('general')).send(birthday)
                message.guild.channels.cache.find(channel => channel.name.includes('bot-commands')).send(birthday)
                message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(birthday)
                message.guild.channels.cache.find(channel => channel.name.includes('new')).send(birthday)              
            }
            else{
                const targetError = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error 0x56B(1387)')
                    .setDescription('The targeted member is invalid!')
                    .setFooter(`message.content = ${message.content}\n%birthday <args[0]>\n                       ^\n1387(0x56B) ERROR_NO_SUCH_MEMBER`)

                message.channel.send(targetError)
            }
        }
        else{
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permissions error 0x5(5)')
                .setDescription("I'm sorry but you do **not** have the **permissions** to perform this command. Please contact the server administrators if you believe that this is an error.")
                .setFooter(`message.content = ${message.content}\n5(0x5) ERROR_ACCESS_DENIED`)
            
            message.channel.send(permissionsError)
        }
    }
}