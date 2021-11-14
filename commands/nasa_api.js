const fetch = require('window-fetch')
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY

module.exports = {
    name: 'nasa-api',
    aliases: ['nasa', 'nasaapi', 'nasa_api'],
    description: 'Usage: ",api-contact"',
    async execute(message, args, cmd, client, Discord) {
        let nasa_color_hex = "0b3d91"
        let nasa_response
        let nasa_response_error_code
        let nasa_apod_hdurl
        let nasa_apod_title
        let nasa_apod_date
        let nasa_apod_explanation
        const contacting = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Contacting NASA-API')
            .addField('NASA_API_KEY owner', 'Jerry#3756', true)
            .setFooter('fetching...')

        message.channel.send(contacting)

        await fetch(`https://api.nasa.gov/planetary/apod?thumbs=true&api_key=${NASA_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                nasa_response = data
                if(!data.error) {
                    const nasaResponseSuccess = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Reading response')
                        .setDescription(`A successful response has been received from the NASA-API`)
                        .setFooter('200')

                    message.channel.send(nasaResponseSuccess)
                    //Defining variables
                    nasa_apod_hdurl = data.hdurl
                    nasa_apod_title = data.title
                    nasa_apod_date = data.date
                    nasa_apod_explanation = data.explanation
                } else {
                    nasa_response_error_code = data.error.code
                    const nasaResponseError = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription("An error occured while fetching information from `api.nasa.gov`")
                        .addField('Code:', `${nasa_response_error_code}`)
                        .setFooter('4xx')

                    message.channel.send(nasaResponseError)
                    return;
                }
            })
    }
}
