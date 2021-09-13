module.exports = {
    name: 'purge',
    aliases: ['clear', 'delete', 'del', 'erase'],
    cooldown: 5,
    description: 'Usage: "%purge <value>"',
    async execute(message, args, cmd, client, Discord){
        
        if(message.member.roles.cache.find(role => role.name === 'BotPL3')){ //BotP R3

            const requireArgs0 = new Discord.MessageEmbed()
                .setColor('#800080')
                .setTitle('Error')
                .setDescription("Invalid command! You must enter a value! Correct usage: %purge <value>.")
                .setFooter(`message.content = ${message.content}\n%purge <args[0]>\n                  ^`)

            if(!args[0]) return message.reply(requireArgs0);


            const Args0IsNaN = new Discord.MessageEmbed()
                .setColor('#800080')
                .setTitle('Error')
                .setDescription("Invalid usage! The value must be a whole number between 1 and 25! Correct usage: %purge <value>.")
                .setFooter(`message.content = ${message.content}\n%purge <args[0]>\n                  ^`)

            if(isNaN(args[0])) return message.reply(Args0IsNaN);


            const requireArgs0is1to25 = new Discord.MessageEmbed()
                .setColor('#800080')
                .setTitle('Error')
                .setDescription("Invalid usage! You can only delete 1 to 25 messages at once! Correct usage: %purge <value>.")
                .setFooter(`message.content = ${message.content}\n%purge <args[0]>\n                  ^`)

            if(args[0] > 25) return message.reply(requireArgs0is1to25);


            const requireArgsGreaterThan1 = new Discord.MessageEmbed()
                .setColor('#800080')
                .setTitle('Error')
                .setDescription("Invalid command! You must delete at least one message! Correct usage: %purge <value>.")
                .setFooter(`message.content = ${message.content}\n%purge <args[0]>\n                  ^`)

            if(args[0] < 1) return message.reply(requireArgsGreaterThan1);

            
            await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
                message.channel.bulkDelete(messages).catch(console.error);
                
                const userPurgedMessages = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('User Purged Messages')
                    .setDescription(`<@${message.member.user.id}> purged ` + args[0] + ` messages in ${message.channel}`)
                    .setFooter(`message.content = ${message.content}`)

                    message.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userPurgedMessages)
        });
        } else{
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permissions error 0x5(5)')
                .setDescription("I'm sorry but you do **not** have the **permissions** to perform this command. Please contact the server administrators if you believe that this is an error.")
                .setFooter(`message.content = ${message.content}`)

            message.channel.send(permissionsError)
        }
    }
}