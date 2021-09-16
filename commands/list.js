module.exports = {
    name: 'list',
    aliases: ['commands', 'commandhelp', 'commandshelp'],
    description: 'Usage: "%list"',
    execute(message, args, cmd, client, Discord){
        const all = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("List of all the commands (all)")
            //.addField(`%`, `__Syntax:__ ""\n__Aliases:__ \n__Use:__ `, false)
            .addField(`%ban`, `__Syntax:__ "%ban <@user>"\n__Aliases:__ None\n__Use:__ Bans the targeted member.`, false)
            .addField(`%beep`, `__Syntax:__ "%beep"\n__Aliases:__ None\n__Use:__ Returns "Boop!"`, false)
            .addField(`%birthday`, `__Syntax:__ "%birthday <@user>"\n__Aliases:__ 'bday'\n__Use:__ Assigns a role to the targeted member and sends some messages.`, false)
            .addField(`%boop`, `__Syntax:__ "%boop <@user>"\n__Aliases:__ None\n__Use:__ Returns "Boop! @memberTarget"`, false)
            .addField(`%friend`, `__Syntax:__ "%friend <add/remove> <@user>"\n__Aliases:__ 'f'\n__Use:__ Add a role to the targeted member.`, false)
            .addField(`%rps`, `__Syntax:__ "%rps"\n__Aliases:__ 'rockpaperscissors', 'rock_paper_scissors'\n__Use:__ Unwinnable game.`, false)
            .addField(`%kick`, `__Syntax:__ "%kick <@user>"\n__Aliases:__ Maybe None\n__Use__ Kicks the targeted memebr.`, false)
            .addField(`%leave`, `__Syntax:__ "%leave"\n__Aliases:__ 'dc', 'disconnect'\n__Use:__ Disconnects the bot from the channel it is in`, false)
            .addField(`%list`, `__Syntax:__ "%list"\n__Aliases:__ 'commands', 'commandhelp', 'commandshelp'\n__Use:__ `, false)
            .addField(`%lockdown`, `__Syntax:__ "%lockdown"\n__Aliases:__ 'lock'\n__Use:__ This feature is planned for the next release!`, false)
            .addField(`%mute`, `__Syntax:__ "%mute <@user> (<duration>)"\n__Aliases:__ 'tempmute', 'temp-mute', 'temp_mute'\n__Use:__ Mutes the targeted member. Duration is optional.`, false)
            .addField(`%party`, `__Syntax:__ This feature is planned for the next release!\n__Aliases:__ This feature is planned for the next release!\n__Use__ This feature is planned for the next release!`, false)
            .addField(`%ping`, `__Syntax:__ "%ping"\n__Aliases:__ None\n__Use:__ Returns "pong"`, false)
            .addField(`%play`, `__Syntax:__ "%play <URL/KeyWords>"\n__Aliases:__ None\n__Use:__ Plays the searched video (sound only)\n__For your safety__, the bot is able to block most Rick Rolls.`, false)
            .addField(`%pong`, `__Syntax:__ "%pong"\n__Aliases:__ None\n__Use:__ Returns "ping"`, false)
            .addField(`%purge`, `__Syntax:__ "%purge <amount>"\n__Aliases:__ 'clear', 'delete'\n__Use:__ Purges the selected amount of messages.`, false)
            .addField(`%reload`, `__Syntax:__ "%reload"\n__Aliases:__ 'update', 'rel'\n__Use:__ Reloads some of the bot's feature`, false)
            .addField(`%report`, `__Syntax:__ "%report <@user>"\n__Aliases:__ 'wdr', 'wdreport', 'watchdogreport', 'chatreport', 'flag'\n__Use:__ Report someone for doing something. This command pings staff members. Do not use without reason.`, false)
            .addField(`%stop`, `__Syntax:__ "%stop"\n__Aliases:__ 'altf4', 'alt-f4', 'arlt_f4', 'terminate', 'shutdown', 'shut-down', 'shut_down'\n__Use:__ Stops the bot (Exit with code 0).`, false)
            .addField(`%test`, `__Syntax:__ Variable\n__Aliases:__ Variable\n__Use:__ Test command, do not use.`, false)
            .addField(`%testfalse`, `__Syntax:__ Variable\n__Aliases:__ Variable\n__Use:__ Test command, do not use.`, false)
            .addField(`%testtrue`, `__Syntax:__ Variable\n__Aliases:__ Variable\n__Use:__ Test command, do not use.`, false)
            .addField(`%unmute`, `__Syntax:__ "%unmute <@user>"\n__Aliases:__ 'un-mute', 'un_mute'\n__Use:__ Unmutes the targeted member`, false)
            .addField(`%youtube`, `__Syntax:__ ""\n__Aliases:__ 'yt', 'ytb', 'itube', 'hetube', 'shetube', 'ittube', 'wetube', 'theytube'\n__Use:__ Sends the link of <@611633988515266562>'s YouTube channel`, false)
        const noReq = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require no permissions (noReq)")
            .addField(`%beep`, `__Syntax:__ "%beep"\n__Aliases:__ None\n__Use:__ Returns "Boop!"`, false)
            .addField(`%boop`, `__Syntax:__ "%boop <@user>"\n__Aliases:__ None\n__Use:__ Returns "Boop! @memberTarget"`, false)
            .addField(`%rps`, `__Syntax:__ "%rps"\n__Aliases:__ 'rockpaperscissors', 'rock_paper_scissors'\n__Use:__ Unwinnable game.`, false)
            .addField(`%leave`, `__Syntax:__ "%leave"\n__Aliases:__ 'dc', 'disconnect'\n__Use:__ Disconnects the bot from the channel it is in`, false)
            .addField(`%list`, `__Syntax:__ "%list"\n__Aliases:__ 'commands', 'commandhelp', 'commandshelp'\n__Use:__ `, false)
            .addField(`%ping`, `__Syntax:__ "%ping"\n__Aliases:__ None\n__Use:__ Returns "pong"`, false)
            .addField(`%play`, `__Syntax:__ "%play <URL/KeyWords>"\n__Aliases:__ None\n__Use:__ Plays the searched video (sound only)\n__For your safety__, the bot is able to block most Rick Rolls.`, false)
            .addField(`%pong`, `__Syntax:__ "%pong"\n__Aliases:__ None\n__Use:__ Returns "ping"`, false)
            .addField(`%report`, `__Syntax:__ "%report <@user>"\n__Aliases:__ 'wdr', 'wdreport', 'watchdogreport', 'chatreport', 'flag'\n__Use:__ Report someone for doing something. This command pings staff members. Do not use without reason.`, false)
            .addField(`%test`, `__Syntax:__ Variable\n__Aliases:__ Variable\n__Use:__ Test command, do not use.`, false)
            .addField(`%testfalse`, `__Syntax:__ Variable\n__Aliases:__ Variable\n__Use:__ Test command, do not use.`, false)
            .addField(`%testtrue`, `__Syntax:__ Variable\n__Aliases:__ Variable\n__Use:__ Test command, do not use.`, false)
            .addField(`%youtube`, `__Syntax:__ ""\n__Aliases:__ 'yt', 'ytb', 'itube', 'hetube', 'shetube', 'ittube', 'wetube', 'theytube'\n__Use:__ Sends the link of <@611633988515266562>'s YouTube channel`, false)
        const reqBotPL3 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require 'BotPL3' (reqBotPL3)")
            .addField(`%birthday`, `__Syntax:__ "%birthday <@user>"\n__Aliases:__ 'bday'\n__Use:__ Assigns a role to the targeted member and sends some messages.`, false)
            .addField(`%mute`, `__Syntax:__ "%mute <@user> (<duration>)"\n__Aliases:__ 'tempmute', 'temp-mute', 'temp_mute'\n__Use:__ Mutes the targeted member. Duration is optional.`, false)
            .addField(`%purge`, `__Syntax:__ "%purge <amount>"\n__Aliases:__ 'clear', 'delete'\n__Use:__ Purges the selected amount of messages.`, false)
            .addField(`%reload`, `__Syntax:__ "%reload"\n__Aliases:__ 'update', 'rel'\n__Use:__ Reloads some of the bot's feature`, false)
            .addField(`%stop`, `__Syntax:__ "%stop"\n__Aliases:__ 'altf4', 'alt-f4', 'arlt_f4', 'terminate', 'shutdown', 'shut-down', 'shut_down'\n__Use:__ Stops the bot (Exit with code 0).`, false)
            .addField(`%unmute`, `__Syntax:__ "%unmute <@user>"\n__Aliases:__ 'un-mute', 'un_mute'\n__Use:__ Unmutes the targeted member`, false)
        const reqBotPL2 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require 'BotPL2' (reqBotPL2)")
            .addField(`%kick`, `__Syntax:__ "%kick <@user>"\n__Aliases:__ Maybe None\n__Use:__ Kicks the targeted memebr.`, false)
        const reqBotPL1 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require 'BotPL1' (reqBotPL1)")
            .addField(`%ban`, `__Syntax:__ "%ban <@user>"\n__Aliases:__ None\n__Use:__ Bans the targeted member.`, false)
        const reqBotPL0 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands tha require 'BotPL0' (reqBotPL0)")
            .setDescription(`There are currently no commands dedicated to 'BotPL0'\nThe following commands are dedicated to the server owner.`)
            .addField(`%friend`, `__Syntax:__ "%friend <add/remove> <@user>"\n__Aliases:__ 'f'\n__Use:__ Adds the 'Friends' role to the targeted member.`, false)
            .addField(`%party`, `__Syntax:__ This feature is planned for the next release!\n__Aliases:__ This feature is planned for the next release!\n__Use:__ This feature is planned for the next release!`, false)
        const floodWarning = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setTitle('Flood warning')
            .setDescription('The next messages will flood the chat.')

        let filter = m => m.author.id === message.author.id
        const query = new Discord.MessageEmbed()
            .setColor('0000ff')
            .setTitle('Select list')
            .setDescription('What list of commands would you like to see?')
            .addField(`Reply: "__all__"`, `**All** the commands`, true)
            .addField(`Reply: "__noReq__"`, `Commands that require **no** permissions`, true)
            .addField(`Reply: "__reqBotPL3__"`, `Commands that require **BotPL3** (Lowest)`, true)
            .addField(`Reply: "__reqBotPL2__"`, `Commands that require **BotPL2**`, true)
            .addField(`Reply: "__reqBotPL1__"`, `Commands that require **BotPL1**`, true)
            .addField(`Reply: "__reqBotPL0__"`, `Commands that require **BotPL0** (Highest)`, true)
            .setFooter('You have 25 seconds to answer')

        message.channel.send(query);
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 25000,
          errors: ['time']
        })
        .then(message => {
          message = message.first()
            if(message.content.toUpperCase() == 'ALL'){ //If 'message.content' to upper case is equal to "ADD"
                message.channel.send(floodWarning)
                .then(() => message.channel.send(all));
            } else if(message.content.toUpperCase() == 'NOREQ'){  //If 'message.content' to upper case is equal to "NOREQ"
                message.channel.send(noReq)
            } else if(message.content.toUpperCase() == 'REQBOTPL3'){  //If 'message.content' to upper case is equal to "REQBOTPL3"
                message.channel.send(reqBotPL3)
            } else if(message.content.toUpperCase() == 'REQBOTPL2'){  //If 'message.content' to upper case is equal to "REQBOTPL2"
                message.channel.send(reqBotPL2)
            } else if(message.content.toUpperCase() == 'REQBOTPL1'){  //If 'message.content' to upper case is equal to "REQBOTPL1"
                message.channel.send(reqBotPL1)
            } else if(message.content.toUpperCase() == 'REQBOTPL0'){  //If 'message.content' to upper case is equal to "REQBOTPL0"
                message.channel.send(reqBotPL0)
            }
        })
        .catch(collected => {
            const requestTimeout = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Timeout 0x5B4(1460)')
            .setDescription("Request timeout")

            message.channel.send(requestTimeout)
        });
    }
}