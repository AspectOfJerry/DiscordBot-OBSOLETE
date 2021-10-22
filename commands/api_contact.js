const fetch = require('window-fetch')
require('dotenv').config();

const API_KEY = process.env.API_KEY
const PLAYER_NAME = 'AspectOfJerry'

module.exports = {
    name: 'api-contact',
    aliases: ['apicontact', 'api_contact', 'contact', 'cont', 'request', 'req', 'contact-api', 'contactapi', 'contact_api'],
    description: 'Usage: "%api-contact"',
    execute(message, args, cmd, client, Discord) {
        mojang_response = new fetch.Request(`https://api.mojang.com/users/profiles/minecraft/${PLAYER_NAME}?`)
        //fetch.Request

        const contacting = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setTitle('Contacting Hypixel-API')
            .setDescription('Attempting to contact the Hypixel-API')
            .addField('API_KEY owner', 'AspectOfJerry', true)
            .addField('Using `uuid`', 'true', true)
            .addField('Using `name`', 'false', true)
            .addField('Converting `name` to `uuid`', 'yes', true)
            .setFooter('fetching')

        message.channel.send(contacting)
        fetch(`https://api.hypixel.net/player?key=${API_KEY}&uuid=${mojang_response}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const responseRead = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('Reading response')
                    .setDescription(`A response has been read from the Hypixel-API`)

                message.channel.send(responseRead)
            })
            .catch(console.error())
    }
}