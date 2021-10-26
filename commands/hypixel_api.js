const fetch = require('window-fetch')
require('dotenv').config();

const API_KEY = process.env.API_KEY
const PLAYER_NAME = 'AspectOfJerry'

module.exports = {
    name: 'api-contact',
    aliases: ['api', 'apicontact', 'api_contact', 'contact', 'cont', 'request', 'req', 'contact-api', 'contactapi', 'contact_api'],
    description: 'Usage: ",api-contact"',
    async execute(message, args, cmd, client, Discord) {
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
            .addField('API_KEY owner', 'AspectOfJerry', true)
            .addField('Using', 'UUID *(8-4-4-4-12)*', true)
            .setFooter('fetching...')

        message.channel.send(contacting)

        //Fetching from api.hypixel.net
        fetch(`https://api.hypixel.net/player?key=${API_KEY}&uuid=${PLAYER_UUID}`)
            .then(response => response.json())
            .then(data => {
                let status = data.success
                if(status == true) {
                    const successTrue = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Reading response')
                        .setDescription(`A response has been received from the Hypixel-API`)
                        .addField(`Success: `, `${status}`, true)
                        .setFooter('200')

                    message.channel.send(successTrue)
                } else if(status == false) {
                    let cause = data.cause
                    const successFalse = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Reading response')
                        .setDescription(`A response has been received from the Hypixel-API`)
                        .addField(`Success: `, `${status}`, true)
                        .addField(`Cause: `, `${cause}`, true)
                        .setFooter('400, 403, 404, 422, 429, 503')

                    message.channel.send(successFalse)
                }
            })
            .catch(console.error())
    }
}
