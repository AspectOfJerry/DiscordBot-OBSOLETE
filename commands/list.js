module.exports = {
    name: 'list',
    description: 'Usage: "%list"',
    execute(message, args, cmd, client, Discord){
        const commandsAll = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("All the commands")
            .addField(`%altf4`, `**Syntax:** "%altf4", **Aliases:** [alt-f4, alt_f4], **Usage:** `, false)
            .addField(`%ban`, `**Syntax:** "%ban <@user>", **Usage:** `, false)
            .setFooter(`x for Previous page, x to remove this embed, x for Next page`)

        const commandsRequireNoBotPL = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require no permissions")
            .addField('', '', false)
            .setFooter(`x for Previous page, x to remove this embed, x for Next page`)

        const commandsRequireBotPL3 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require 'BotPL3'")
            .addField('', '', false)
            .setFooter(`x for Previous page, x to remove this embed, x for Next page`)

        const commandsRequireBotPL2 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require 'BotPL2'")
            .addField('', '', false)
            .setFooter(`x for Previous page, x to remove this embed, x for Next page`)

        const commandsRequireBotPL1 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands that require 'BotPL1'")
            .addField('', '', false)
            .setFooter(`x for Previous page, x to remove this embed, x for Next page`)

        const commandsRequireBotPL0 = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle("Commands tha require 'BotPL0'")
            .setDescription(`There are currently no commands dedicated to 'BotPL0'.`)
            .setFooter(`x for Previous page, x to remove this embed, x for Next page`)

        message.channel.send(commandsAll)
        message.channel.send(commandsRequireNoBotPL)
        message.channel.send(commandsRequireBotPL3)
        message.channel.send(commandsRequireBotPL2)
        message.channel.send(commandsRequireBotPL1)
        message.channel.send(commandsRequireBotPL0)
    }
}