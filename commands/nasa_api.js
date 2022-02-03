const fetch = require('window-fetch')
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY

module.exports = {
    name: 'nasa-api',
    aliases: ['nasa', 'nasaapi', 'nasa_api'],
    description: 'Usage: "%api-contact"',
    async execute(message, args, cmd, client, Discord) {
        let nasa_color_hex = "0b3d91"
        let nasa_response
        let nasa_response_error_code
        const contacting = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Contacting NASA-API')
            .addField('NASA_API_KEY owner', '<@611633988515266562>', true)
            .setFooter('fetching...')

        message.channel.send(contacting)

        await fetch(`https://api.nasa.gov/planetary/apod?thumbs=true&api_key=${NASA_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                nasa_response = data
                if(!data.error) {
                    const successNASAResponse = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Success')
                        .setDescription(`A successful response has been received from the NASA-API`)

                    message.channel.send(successNASAResponse)
                } else {
                    nasa_response_error_code = data.error.code
                    const errorNASAResponse = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                        .setTitle('Error')
                        .setDescription("An error occured while fetching information from `api.nasa.gov`")
                        .addField('Code:', `${nasa_response_error_code}`)

                    message.channel.send(errorNASAResponse)
                    return;
                }
            })
    }
}
