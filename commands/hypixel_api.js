const fetch = require('window-fetch')
require('dotenv').config();

const HYPIXEL_API_KEY = process.env.HYPIXEL_API_KEY
const PLAYER_NAME = 'AspectOfJerry'

module.exports = {
    name: 'hypixel-api',
    aliases: ['hypixel', 'hypixelapi', 'hypixel_api'],
    description: 'Usage: "%hypixel-api"',
    async execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%hypixel-api command help')
                .setDescription('This comamnd contacts the Hypixel API and waits for a response.')
                .addField(`Usage`, "`%hypixel-api`", true)
                .addField(`Aliases`, "`hypixel`, `hypixelapi`, `hypixel_api`", true)
                .setFooter('This command is not case-sensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Code
    
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
