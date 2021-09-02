module.exports = {
    name: 'party',
    aliases: ['p'],
    cooldown: 5,
    description: 'Usage: "%party <@user>"',
    execute(message, args, cmd, client, Discord){
        if(message.member.user.id === '611633988515266562'){
            const target = message.mentions.users.first();

            const requireArgs0 = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error: "' + message.content + '"')
            .setDescription("Invalid command! You must __add__ or __remove__ a user! Correct usage: %party <invite/kick> <@user>.")
        
            if(!args[0]) return message.channel.send(requireArgs0) //Checks if args[0] is not present
        
            if(args[0] == "invite"){    //Checks if args[0] contains "invite"
                const memberTarget = message.guild.members.cache.get(target.id);

                if(!args[1]){   //Checks if args[1] is not present
                    const requireArgs1 = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('Error: "' + message.content + '"')
                    .setDescription("Invalid command! You must mention a user! Correct usage: %friend <add/remove> <@user>.")

                    message.channel.send(requireArgs1)
                }
                else{
                    if(target){ //Checks if the target is valid (true)
                        const invite = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Party invite')
                        .setDescription(`<@${message.member.user.id}> invited <@${memberTarget.user.id}> to the party! They have 60 seconds to accept.`)

                        //INVITED
                    }
                    else{   //If the target is invalid (false)
                        const invalidTarget = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Error: "' + message.content + '"')
                        .setDescription('The targeted member is invalid!')
    
                        message.channel.send(invalidTarget)
                    }
                }
            }
            else if(args[0] == "kick"){ //Checks if args[0] contains "kick"
                const memberTarget = message.guild.members.cache.get(target.id);
                if(!args[1]){   //Checks if args[1] is not present
                    const requireArgs1 = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('Error: "' + message.content + '"')
                    .setDescription("Invalid command! You must mention a user! Correct usage: %friend <add/remove> <@user>.")

                    message.channel.send(requireArgs1)
                }
                else{   //If args[1] is present
                    if(target){ //Checks if the target is valid
                        const kick = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Party kick')
                        .setDescription(`<@${message.member.user.id}> removed <@${memberTarget.user.id} from the party>`)

                        //INVITED
                    }
                    else{   //If the target is invalid
                        const invalidTarget = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Error: "' + message.content + '"')
                        .setDescription('The targeted member is invalid!')
    
                        message.channel.send(invalidTarget)
                    }
                }
            }
            else{
                const memberTarget = message.guild.members.cache.get(target.id);

            }
        }
        else{
            const notImplementedForAll = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error 501')
            .setDescription('The "%party <invite/kick> <@user>" command is currently **only** available to the server __owner__!')
            .setTitle('501 NOT_IMPLEMENTED')
        }
    }
}