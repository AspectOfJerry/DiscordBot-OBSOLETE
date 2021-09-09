module.exports = {
    name: 'list',
    aliases: ['commands', 'commandhelp', 'commandshelp'],
    description: 'Usage: "%list"',
    execute(message, args, cmd, client, Discord){
        
        const all = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("List of all the commands (all)")
            //.addField(`%`, `**Syntax:** ""\n**Aliases:** \n**Use:** `, false)
            .addField(`__**%altf4**__`, `**Syntax:** "%altf4"\n**Aliases:** 'alt-f4', 'alt_f4'\n**Use:** Stops the bot (Exit with code 0).`, false)
            .addField(`__**%ban**__`, `**Syntax:** "%ban <@user>"\n**Aliases:** None\n**Use:** Bans the targeted member.`, false)
            .addField(`__**%beep**__`, `**Syntax:** "%beep"\n**Aliases:** None\n**Use:** Returns "Boop!"`, false)
            .addField(`__**%birthday**__`, `**Syntax:** "%birthday <@user>"\n**Aliases:** 'bday'\n**Use:** Assigns a role to the targeted member and sends some messages.`, false)
            .addField(`__**%boop**__`, `**Syntax:** "%boop <@user>"\n**Aliases:** None\n**Use:** Returns "Boop! @memberTarget"`, false)
            .addField(`__**%embedmethods**__`, `**Syntax:** "%embedmethods"\n**Aliases:** None\n**Use:** Test feature, do not use.`, false)
            .addField(`__**%friend**__`, `**Syntax:** "%friend <add/remove> <@user>"\n**Aliases:** 'f'\n**Use:** Add a role to the targeted member.`, false)
            .addField(`__**%rps**__`, `**Syntax:** "%rps"\n**Aliases:** 'rockpaperscissors', 'rock_paper_scissors'\n**Use:** Unwinnable game.`, false)
            .addField(`__**%kick**__`, `**Syntax:** "%kick <@user>"\n**Aliases:** Easter egg...\n**Use:** Kicks the targeted memebr.`, false)
            .addField(`__**%leave**__`, `**Syntax:** "%leave"\n**Aliases:** 'dc', 'disconnect'\n**Use:** Disconnects the bot from the channel it is in`, false)
            .addField(`__**%list**__`, `**Syntax:** "%list"\n**Aliases:** 'commands', 'commandhelp', 'commandshelp'\n**Use:** `, false)
            .addField(`__**%lockdown**__`, `**Syntax:** "%lockdown"\n**Aliases:** 'lock'\n**Use:** This feature is planned for the next release!`, false)
            .addField(`__**%mute**__`, `**Syntax:** "%mute <@user> (<duration>)"\n**Aliases:** 'tempmute', 'temp-mute', 'temp_mute'\n**Use:** Mutes the targeted member. Duration is optional.`, false)
            .addField(`__**%party**__`, `**Syntax:** This feature is planned for the next release!\n**Aliases:** This feature is planned for the next release!\n**Use:** This feature is planned for the next release!`, false)
            .addField(`__**%ping**__`, `**Syntax:** "%ping"\n**Aliases:** None\n**Use:** Returns "pong"`, false)
            .addField(`__**%play**__`, `**Syntax:** "%play <URL/KeyWords>"\n**Aliases:** None\n**Use:** Plays the searched video (sound only)\n**For your safety**, the bot is able to block most Rick Rolls.`, false)
            .addField(`__**%pong**__`, `**Syntax:** "%pong"\n**Aliases:** None\n**Use:** Returns "ping"`, false)
            .addField(`__**%purge**__`, `**Syntax:** "%purge <amount>"\n**Aliases:** 'clear', 'delete'\n**Use:** Purges the selected amount of messages.`, false)
            .addField(`__**%reload**__`, `**Syntax:** "%reload"\n**Aliases:** 'update', 'rel'\n**Use:** Reloads some of the bot's feature`, false)
            .addField(`__**%stop**__`, `**Syntax:** "%stop"\n**Aliases:** 'terminate', 'shutdown', 'shut-down', 'shut_down'\n**Use:** Stops the bot (Exit with code 0).`, false)
            .addField(`__**%temp**__`, `**Syntax:** Variable\n**Aliases:** Variable\n**Use:** Temporary command`, false)
            .addField(`__**%test**__`, `**Syntax:** Variable\n**Aliases:** Variable\n**Use:** Test command`, false)
            .addField(`__**%testfalse**__`, `**Syntax:** Variable\n**Aliases:** Variable\n**Use:** Test command`, false)
            .addField(`__**%testtrue**__`, `**Syntax:** Variable\n**Aliases:** Variable\n**Use:** Test command`, false)
            .addField(`__**%unmute**__`, `**Syntax:** "%unmute <@user>"\n**Aliases:** 'un-mute', 'un_mute'\n**Use:** Unmutes the targeted member`, false)
            .addField(`__**%youtube**__`, `**Syntax:** ""\n**Aliases:** 'yt', 'ytb', 'itube', 'hetube', 'shetube', 'ittube', 'wetube', 'theytube'\n**Use:** Sends the link of <@611633988515266562>'s YouTube channel`, false)


        const noReq = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require no permissions (noReq)")


        const reqBotPL3 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require 'BotPL3' (reqBotPL3)")


        const reqBotPL2 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require 'BotPL2' (reqBotPL2)")


        const reqBotPL1 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require 'BotPL1' (reqBotPL1)")


        const reqBotPL0 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands tha require 'BotPL0' (reqBotPL0)")
            .setDescription(`There are currently no commands dedicated to 'BotPL0'.`)

        const floodWarning = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setTitle('Flood warning')
            .setDescription('The next messages will flood the chat.')


        let filter = m => m.author.id === message.author.id
        const query = new Discord.MessageEmbed()
            .setColor('0000ff')
            .setTitle('Select list')
            .setDescription('What list of commands would you like to see?')
            .addField(`**All** the commands`, `Reply: "**all**"`, true)
            .addField(`Commands that require __**no**__ permissions`, `Reply: "**noReq**"`, true)
            .addField(`Commands that require __**BotPL3**__ (Lowest)`, `Reply: "**reqBotPL3**"`, true)
            .addField(`Commands that require __**BotPL2**__`, `Reply: "**reqBotPL2**"`, true)
            .addField(`Commands that require __**BotPL1**__`, `Reply: "**reqBotPL1**"`, true)
            .addField(`Commands that require __**BotPL0**__ (Highest)`, `Reply: "**reqBotPL0**"`, true)
            .setFooter('You have 15 seconds to answer')

        message.channel.send(query);
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 15000,
          errors: ['time']
        })
        .then(message => {
          message = message.first()
            if(message.content.toUpperCase() == 'ALL'){
                message.channel.send(floodWarning)
                .then(() => message.channel.send(all));
            }
            else if(message.content.toUpperCase() == 'NOREQ'){
                message.channel.send(noReq)
            }
            else if(message.content.toUpperCase() == 'REQBOTPL3'){
                message.channel.send(reqBotPL3)
            }
            else if(message.content.toUpperCase() == 'REQBOTPL2'){
                message.channel.send(reqBotPL2)
            }
            else if(message.content.toUpperCase() == 'REQBOTPL1'){
                message.channel.send(reqBotPL1)
            }
            else if(message.content.toUpperCase() == 'REQBOTPL0'){
                message.channel.send(reqBotPL0)
            }
        })
        .catch(collected => {
            const timeout = new Discord.MessageEmbed()
                .setColor('#800080')
                .setTitle('Error 0x5B4 (1460)')
                .setDescription('Command timeout!')
                .setFooter('ERROR_TIMEOUT')

            message.channel.send(timeout)
        });
    }
}