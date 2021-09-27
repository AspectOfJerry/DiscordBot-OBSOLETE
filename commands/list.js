module.exports = {
    name: 'list',
    aliases: ['commands', 'commandhelp', 'commandshelp'],
    description: 'Usage: "%list"',
    execute(message, args, cmd, client, Discord) {
        const all = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle("List of all the commands (all)")
            //.addField(`%`, `__Syntax:__ ""\n__Aliases:__ \n__Use:__ `, false)
            .addField(`%ban`, `__Syntax:__ "%ban <@user>"\n__Aliases:__ None\n__Use:__ Bans the targeted member.`, false)
            .addField(`%beep`, `__Syntax:__ "%beep"\n__Aliases:__ None\n__Use:__ Returns "Boop!"`, false)
            .addField(`%boop`, `__Syntax:__ "%boop <@user>"\n__Aliases:__ None\n__Use:__ Returns "Boop! @memberTarget"`, false)
            .addField(`%join`, `__Syntax:__ "%join"\n__Aliases:__ None\n__Use:__ Joins the channel of the message member and deletes the queue.`, false)
            .addField(`%kick`, `__Syntax:__ "%kick <@user>"\n__Aliases:__ None\n__Use__ Kicks the targeted memebr.`, false)
            .addField(`%leave`, `__Syntax:__ "%leave"\n__Aliases:__ 'dc', 'disconnect'\n__Use:__ Disconnects the bot from the channel it is in and deletes the queue`, false)
            .addField(`%list`, `__Syntax:__ "%list"\n__Aliases:__ 'commands', 'commandhelp', 'commandshelp'\n__Use:__ `, false)
            .addField(`%mute`, `__Syntax:__ "%mute <@user> (<duration>)"\n__Aliases:__ 'tempmute', 'temp-mute', 'temp_mute'\n__Use:__ Mutes the targeted member. Duration is optional.`, false)
            .addField(`%ping`, `__Syntax:__ "%ping"\n__Aliases:__ None\n__Use:__ Returns "pong"`, false)
            .addField(`%play`, `__Syntax:__ "%play <URL/KeyWords>"\n__Aliases:__ None\n__Use:__ Plays the searched video (sound only)\n__For your safety__, the bot is able to block most Rick Rolls.`, false)
            .addField(`%pong`, `__Syntax:__ "%pong"\n__Aliases:__ None\n__Use:__ Returns "ping"`, false)
            .addField(`%purge`, `__Syntax:__ "%purge <amount>"\n__Aliases:__ 'clear', 'delete'\n__Use:__ Purges the selected amount of messages.`, false)
            .addField(`%reload`, `__Syntax:__ "%reload"\n__Aliases:__ 'update', 'rel'\n__Use:__ Reloads some of the bot's feature`, false)
            .addField(`%rps`, `__Syntax:__ "%rps"\n__Aliases:__ 'rockpaperscissors', 'rock_paper_scissors'\n__Use:__ Unwinnable game.`, false)
            .addField(`%stop`, `__Syntax:__ "%stop"\n__Aliases:__ 'altf4', 'alt-f4', 'arlt_f4', 'terminate', 'shutdown', 'shut-down', 'shut_down'\n__Use:__ Stops the bot (Exit with code 0).`, false)
            .addField(`%test`, `__Syntax:__ Variable\n__Aliases:__ Variable\n__Use:__ Test command, do not use.`, false)
            .addField(`%unmute`, `__Syntax:__ "%unmute <@user>"\n__Aliases:__ 'un-mute', 'un_mute'\n__Use:__ Unmutes the targeted member`, false)
            .addField(`%youtube`, `__Syntax:__ ""\n__Aliases:__ 'yt', 'ytb', 'itube', 'hetube', 'hetubes', 'shetube', 'shetubes', 'ittube', 'ittubes', 'wetube', 'theytube'\n__Use:__ Sends the link of <@611633988515266562>'s YouTube channel`, false)
        const noReq = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle("Commands that require no permissions (noReq)")
            .addField(`%beep`, `__Syntax:__ "%beep"\n__Aliases:__ None\n__Use:__ Returns "Boop!"`, false)
            .addField(`%boop`, `__Syntax:__ "%boop <@user>"\n__Aliases:__ None\n__Use:__ Returns "Boop! @memberTarget"`, false)
            .addField(`%join`, `__Syntax:__ "%join"\n__Aliases:__ None\n__Use:__ Joins the channel of the message member and deletes the queue.`, false)
            .addField(`%leave`, `__Syntax:__ "%leave"\n__Aliases:__ 'dc', 'disconnect'\n__Use:__ Disconnects the bot from the channel it is in`, false)
            .addField(`%list`, `__Syntax:__ "%list"\n__Aliases:__ 'commands', 'commandhelp', 'commandshelp'\n__Use:__ `, false)
            .addField(`%ping`, `__Syntax:__ "%ping"\n__Aliases:__ None\n__Use:__ Returns "pong"`, false)
            .addField(`%play`, `__Syntax:__ "%play <URL/KeyWords>"\n__Aliases:__ None\n__Use:__ Plays the searched video (sound only)\n__For your safety__, the bot is able to block most Rick Rolls.`, false)
            .addField(`%pong`, `__Syntax:__ "%pong"\n__Aliases:__ None\n__Use:__ Returns "ping"`, false)
            .addField(`%rps`, `__Syntax:__ "%rps"\n__Aliases:__ 'rockpaperscissors', 'rock_paper_scissors'\n__Use:__ Unwinnable game.`, false)
            .addField(`%test`, `__Syntax:__ Variable\n__Aliases:__ Variable\n__Use:__ Test command, do not use.`, false)
            .addField(`%youtube`, `__Syntax:__ ""\n__Aliases:__ 'yt', 'ytb', 'itube', 'hetube', 'shetube', 'ittube', 'wetube', 'theytube'\n__Use:__ Sends the link of <@611633988515266562>'s YouTube channel`, false)
        const reqBotPL3 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle("Commands that require 'helper goldfish' (reqHelper)")
            .addField(`%mute`, `__Syntax:__ "%mute <@user> (<duration>)"\n__Aliases:__ 'tempmute', 'temp-mute', 'temp_mute'\n__Use:__ Mutes the targeted member. Duration is optional.`, false)
            .addField(`%purge`, `__Syntax:__ "%purge <amount>"\n__Aliases:__ 'clear', 'delete'\n__Use:__ Purges the selected amount of messages.`, false)
            .addField(`%reload`, `__Syntax:__ "%reload"\n__Aliases:__ 'update', 'rel'\n__Use:__ Reloads some of the bot's feature`, false)
            .addField(`%stop`, `__Syntax:__ "%stop"\n__Aliases:__ 'altf4', 'alt-f4', 'arlt_f4', 'terminate', 'shutdown', 'shut-down', 'shut_down'\n__Use:__ Stops the bot (Exit with code 0).`, false)
            .addField(`%unmute`, `__Syntax:__ "%unmute <@user>"\n__Aliases:__ 'un-mute', 'un_mute'\n__Use:__ Unmutes the targeted member`, false)
        const reqBotPL2 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle("Commands that require 'moderator goldfish' (reqMod)")
            .addField(`%kick`, `__Syntax:__ "%kick <@user>"\n__Aliases:__ None\n__Use:__ Kicks the targeted memebr.`, false)
        const reqBotPL1 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require 'admin goldfish' (reqAdmin)")
            .addField(`%ban`, `__Syntax:__ "%ban <@user>"\n__Aliases:__ None\n__Use:__ Bans the targeted member.`, false)
        const reqBotPL0 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle("Commands that require 'overlord goldfish' (reqOverlord)")
            .setDescription(`There are currently no commands dedicated to 'BotPL0'.`)
        const floodWarning = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Flood warning')
            .setDescription('The next messages will flood the chat.')

        let filter = m => m.author.id === message.author.id
        const query = new Discord.MessageEmbed()
            .setColor('0000ff')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Select list')
            .setDescription('What list of commands would you like to see?')
            .addField(`Reply: "__all__"`, `**All** the commands`, true)
            .addField(`Reply: "__noReq__"`, `Commands that require **no** permissions`, true)
            .addField(`Reply: "__reqHelper__"`, `Commands that require **helper goldfish** (Lowest)`, true)
            .addField(`Reply: "__reqMod__"`, `Commands that require **moderator goldfish**`, true)
            .addField(`Reply: "__reqAdmin__"`, `Commands that require **admin goldfish**`, true)
            .addField(`Reply: "__reqOverlord__"`, `Commands that require **overlord goldfish** (Highest)`, true)
            .setFooter('You have 25 seconds to answer')

        message.channel.send(query);
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 25000,
            errors: ['time']
        })
            .then(message => {
                message = message.first()
                if(message.content.toUpperCase() == 'ALL') { //If 'message.content' to upper case is equal to "ADD"
                    message.channel.send(floodWarning)
                        .then(() => message.channel.send(all));
                } else if(message.content.toUpperCase() == 'NOREQ') {  //If 'message.content' to upper case is equal to "NOREQ"
                    message.channel.send(noReq)
                } else if(message.content.toUpperCase() == 'REQHELPER') {  //If 'message.content' to upper case is equal to "REQBOTPL3"
                    message.channel.send(reqBotPL3)
                } else if(message.content.toUpperCase() == 'REQMOD') {  //If 'message.content' to upper case is equal to "REQBOTPL2"
                    message.channel.send(reqBotPL2)
                } else if(message.content.toUpperCase() == 'REQADMIN') {  //If 'message.content' to upper case is equal to "REQBOTPL1"
                    message.channel.send(reqBotPL1)
                } else if(message.content.toUpperCase() == 'REQOVERLORD') {  //If 'message.content' to upper case is equal to "REQBOTPL0"
                    message.channel.send(reqBotPL0)
                }
            })
            .catch(collected => {
                const requestTimeout = new Discord.MessageEmbed()
                    .setColor('#800080')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('Timeout')
                    .setDescription("Request timeout")

                message.channel.send(requestTimeout)
            });
    }
}