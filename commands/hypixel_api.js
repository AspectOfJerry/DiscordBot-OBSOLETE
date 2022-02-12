const fetch = require('window-fetch')
require('dotenv').config();

const HYPIXEL_API_KEY = process.env.HYPIXEL_API_KEY
const PLAYER_NAME = 'AspectOfJerry'

module.exports = {
    name: 'hypixel_api',
    aliases: ['hypixel', 'hypixelapi', 'hypixel-api'],
    description: 'Usage: "%hypixel-api"',
    async execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%hypixel_api command help (BotPL3)')
                .setDescription('This comamnd contacts the Hypixel API and waits for a response.')
                .addField(`Usage`, "`%hypixel_api`", true)
                .addField(`Aliases`, "`hypixel`, `hypixelapi`, `hypixel-api`", true)
                .addField("Stats for nerds", "Lines: `88`; File size: `~4` KB", false)
                .setFooter('This command is case-insensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Code
        if(!message.member.roles.cache.has(role => role.name === 'BotPL3')) {
            const errorNoPermissions = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(errorNoPermissions)
            return;
        }
        //Fetching from api.mojang.com
        let PLAYER_UUID
        let mojang_response
        await fetch(`https://api.mojang.com/users/profiles/minecraft/aspectofjerry`)
            .then(response => response.json())
            .then(data => {
                mojang_response = data
                PLAYER_UUID = mojang_response.id
            })

        const contacting = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Contacting Hypixel-API')
            .setDescription('Attempting to contact the Hypixel-API')
            .addField('HYPIXEL_API_KEY owner', '<@611633988515266562> (AspectOfJerry)', true)
            .addField('Using', 'UUID *(8-4-4-4-12)*', true)
            .setFooter('fetching...')

        message.channel.send(contacting)

        //Fetching from api.hypixel.net
        fetch(`https://api.hypixel.net/player?key=${HYPIXEL_API_KEY}&uuid=${PLAYER_UUID}`)
            .then(response => response.json())
            .then(data => {
                let status = data.success
                if(status == true) {
                    const successTrue = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Response')
                        .setDescription(`A response has been received from the Hypixel-API!`)
                        .addField(`Success: `, `${status}`, true)

                    message.channel.send(successTrue)
                } else if(status == false) {
                    let cause = data.cause
                    const successFalse = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Response')
                        .setDescription(`A response has been received from the Hypixel-API`)
                        .addField(`Success: `, `${status}`, true)
                        .addField(`Cause: `, `${cause}`, true)

                    message.channel.send(successFalse)
                }
            })
            .catch(console.error())
    }
}
