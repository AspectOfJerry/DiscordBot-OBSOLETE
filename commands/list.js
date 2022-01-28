module.exports = {
    name: 'list',
    aliases: ['commands', 'commandhelp', 'commandshelp'],
    description: 'Usage: "%list"',
    execute(message, args, cmd, client, Discord) {
        message.reply('This command is temporarily disabled'); return;
        const list = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle("List of all the commands")
            //.addField(`%`, `__Syntax:__ ""\n__Aliases:__ \n__Use:__ `, false)
            .addField(`%avatar`, `__Syntax:__ "%avatar (<@user>)"\n__Aliases:__ 'av', 'a'\n__Use:__ Shows the avatar of the targeted member or self`, false)
            .addField(`%ban`, `__Syntax:__ "%ban <@user>"\n__Aliases:__ None\n__Use:__ Bans the targeted member.`, false)
            .addField(`%beep`, `__Syntax:__ "%beep"\n__Aliases:__ None\n__Use:__ Returns "Boop!"`, false)
            .addField(`%boop`, `__Syntax:__ "%boop <@user>"\n__Aliases:__ None\n__Use:__ Returns "Boop! @memberTarget"`, false)
            .addField(`%friend`, `__Syntax:__ "%friend <add/remove> <@user>"\n__Aliases:__ 'f'\n__Use:__ Add a role to the targeted member.`, false)
            .addField(`%join`, `__Syntax:__ "%join"\n__Aliases:__ None\n__Use:__ Joins the channel of the message member and deletes the queue.`, false)
            .addField(`%kick`, `__Syntax:__ "%kick <@user>"\n__Aliases:__ 'cassetoi', 'casse-toi', 'casse_toi', 'wolacassetoi', 'wola-casse-toi', 'wola_casse_toi'\n__Use__ Kicks the targeted memebr.`, false)
            .addField(`%leave`, `__Syntax:__ "%leave"\n__Aliases:__ 'dc', 'disconnect'\n__Use:__ Disconnects the bot from the channel it is in and deletes the queue`, false)
            .addField(`%list`, `__Syntax:__ "%list"\n__Aliases:__ 'commands', 'commandhelp', 'commandshelp'\n__Use:__ Shows this list of all the commands`, false)
            .addField(`%lockdown`, `__Syntax:__ "%lockdown"\n__Aliases:__ 'lock'\n__Use:__ Locks every channel!`, false)
            .addField(`%mute`, `__Syntax:__ "%mute <@user> (<duration>)"\n__Aliases:__ 'tempmute', 'temp-mute', 'temp_mute'\n__Use:__ Mutes the targeted member. Duration is optional.`, false)
            .addField(`%party`, `__Syntax:__ This feature is planned for the next release!\n__Aliases:__ This feature is planned for the next release!\n__Use__ This feature is planned for the next release!`, false)
            .addField(`%ping`, `__Syntax:__ "%ping"\n__Aliases:__ None\n__Use:__ Returns "pong"`, false)
            .addField(`%play`, `__Syntax:__ "%play <URL/KeyWords>"\n__Aliases:__ None\n__Use:__ Plays the searched video (sound only)\n__For your safety__, the bot is able to block most Rick Rolls.`, false)
            .addField(`%pong`, `__Syntax:__ "%pong"\n__Aliases:__ None\n__Use:__ Returns "ping"`, false)
            .addField(`%purge`, `__Syntax:__ "%purge <amount>"\n__Aliases:__ 'clear', 'delete'\n__Use:__ Purges the selected amount of messages.`, false)
            .addField(`%reload`, `__Syntax:__ "%reload"\n__Aliases:__ 'update', 'rel'\n__Use:__ Reloads some of the bot's feature`, false)
            .addField(`%report`, `__Syntax:__ "%report <@user>"\n__Aliases:__ 'wdr', 'wdreport', 'watchdogreport', 'chatreport', 'flag'\n__Use:__ Report someone for doing something. This command pings staff members. Do not use without reason.`, false)
            .addField(`%rps`, `__Syntax:__ "%rps"\n__Aliases:__ 'rockpaperscissors', 'rock_paper_scissors'\n__Use:__ Unwinnable game.`, false)
            .addField(`%stop`, `__Syntax:__ "%stop"\n__Aliases:__ 'altf4', 'alt-f4', 'arlt_f4', 'terminate', 'shutdown', 'shut-down', 'shut_down'\n__Use:__ Stops the bot (Exit with code 0).`, false)
            .addField(`%test`, `__Syntax:__ Variable\n__Aliases:__ Variable\n__Use:__ Test command, do not use.`, false)
            .addField(`%unmute`, `__Syntax:__ "%unmute <@user>"\n__Aliases:__ 'un-mute', 'un_mute'\n__Use:__ Unmutes the targeted member`, false)
            .addField(`%youtube`, `__Syntax:__ "%youtube"\n__Aliases:__ 'yt', 'ytb', 'itube', 'hetube', 'hetubes', 'shetube', 'shetubes', 'ittube', 'ittubes', 'wetube', 'theytube'\n__Use:__ Sends the link of <@611633988515266562>'s YouTube channel`, false)
        
            message.channel.send(list)
    }
}
