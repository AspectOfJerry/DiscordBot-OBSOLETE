module.exports = {
    name: 'purge',
    aliases: ['clear', 'delete'],
    cooldown: 5,
    description: 'Usage: "%purge <value>"',
    async execute(message, args, cmd, client, Discord){
        
        if(message.member.roles.cache.has('869995421794193518')){ //BotP R3

            const requireArgs0 = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Error: "' + message.content + '"')
            .setDescription("Invalid command! You must enter a value! Correct usage: %purge <value>.")
            .setFooter('449 RETRY_WITH')
            if(!args[0]) return message.reply(requireArgs0);


            const Args0IsNaN = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Error: "' + message.content + '"')
            .setDescription("Invalid usage! The value must be a whole number between 1 and 25! Correct usage: %purge <value>.")
            .setFooter('449 RETRY_WITH')

            if(isNaN(args[0])) return message.reply(Args0IsNaN);


            const requireArgs0is1to25 = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Error: "' + message.content + '"')
            .setDescription("Invalid usage! You can only delete 1 to 25 messages at once! Correct usage: %purge <value>.")
            .setFooter('449 RETRY_WITH')

            if(args[0] > 25) return message.reply(requireArgs0is1to25);


            const requireArgsGreaterThan1 = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Error: "' + message.content + '"')
            .setDescription("Invalid command! You must delete at least one message! Correct usage: %purge <value>.")
            .setFooter('449 RETRY_WITH')

            if(args[0] < 1) return message.reply(requireArgsGreaterThan1);

            
            await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
                message.channel.bulkDelete(messages).catch(console.error);
                
                const userPurgedMessages = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('User Purged Messages: "' + message.content + '"')
                .setDescription(`<@${message.member.user.id}> purged ` + args[0] + ` messages in ${message.channel}`)
                .setFooter('200 OK')

                message.guild.channels.cache.get('874419074535415848').send(userPurgedMessages)
        });
        }else{
            const permissionsTooLow = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error 403: "' + message.content + '"')
            .setDescription("I'm sorry but you do **not** have the __permissions__ to **perform** this __command__. Please contact the server administrators if you believe that this is an error.")
            .setFooter('403 FORBIDDEN')

            message.channel.send(permissionsTooLow)
        }
    }
}