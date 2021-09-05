module.exports = {
    name: 'list',
    description: 'Usage: "%list"',
    execute(message, args, cmd, client, Discord){
        const commands = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle('Command list')
            .addFields(
                {name: '%ban <@user>, Require "BotP R1"', value: 'Use: Bans a member from the guild. <@user> must be a mention. *Command is fully fault tolerant.*'},
                {name: '%beep', value: 'Use: Returns "Boop!". . *Command is fully fault tolerant.*'},
                {name: '%birthday, Aliases: "%bday"', value: "Use: Adds a birthday role to a member. *Command is fully fault tolerant.*"},
                {name: '%boop <@user>', value: `Use: Same thing as Hypixel's "/boop <player>" command. *Command is fully fault tolerant.*`},
                {name: '%friend <add/remove> <@user>, Aliases: "%f"', value: "Use: Adds or removes a friend role to a user. *Command is partly fault tolerant.*"},
                {name: '%commands', value: 'Use: Shows this list. *Command is fully fault tolerant.*'},
                {name: '%rps', value: 'Use: Rock Paper Scissor game (Impossible to win). *Command is partly fault tolerant.*'},
                {name: '%kick <@user>', value: `Require "BotP R2"', value: 'Use: Kicks a member from the guild. <@user> must be a mention. *Command is fully fault tolerant.*`},
                {name: '%leave', value: 'Use: Make the bot leave the channel. You must be in the same channel as the bot to perform this command. *Command is fully fault tolerant.*'},
                {name: '%lockdown <true/false>, Aliases: "%lock"', value: "Use: Locks or unlocks all channels. *Command currently being tested.*"},
                {name: '%mute <@user> (<duration>), Require "BotP R3"', value: 'Use: Mutes a member. <@user> must be a mention, <duration> is optional. *Command is partly fault tolerant.*'},
                {name: '%ping', value: 'Use: Returns "pong". . *Command is fully fault tolerant.*'},
                {name: '%play <URL/keyWords>', value: `Use: Plays the entered song. You must be in the same channel as the bot to perform this command. *Command is fully fault tolerant.*`},
                {name: '%pong', value: 'Use: Returns "ping". *Command is fully fault tolerant.*'},
                {name: '%purge <amount>', value: 'Use: Purges a certain amout of messages. <amount> must be !NaN and between 1 and 25. *Command is fully fault tolerant.*'},
                {name: '%testdisable (<...>)', value: 'Use: Command to initiate a code that is testing a toggelable command. *Experimental, warnings, errors and non-zero exit codes can occur.*'},
                {name: '%testenable (<...>)', value: 'Use: Command to initiate a code that is testing a toggelable command. *Experimental, warnings, errors and non-zero exit codes can occur.*'},
                {name: '%testglobal (<...>)', value: 'Use: Command to initiate a code that is currently being tested. *Experimental, warnings, errors and non-zero exit codes can occur.*'},
                {name: '%unmute <@user>', value: 'Use: Unmutes a muted user. *Command is fully fault tolerant.*'}
            )
            .setFooter(`message.content = ${message.content}`)

        message.channel.send(commands);
    }
}