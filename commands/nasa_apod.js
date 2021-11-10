const fetch = require('window-fetch')
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY

module.exports = {
    name: 'nasa-apod',
    aliases: ['apod', 'nasaapod', 'nasa_apod'],
    description: 'Usage: "%api-contact"',
    async execute(message, args, cmd, client, Discord) {
        let nasa_color_hex = "0b3d91"
        let nasa_response
        let nasa_response_error_code
        let nasa_apod_image
        let nasa_apod_title
        let nasa_apod_date
        let nasa_apod_explanation
        try {
            await fetch(`https://api.nasa.gov/planetary/apod?thumbs=true&api_key=${NASA_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    nasa_response = data

                    if(data.error) {
                        nasa_response_error_code = data.error.code
                    }

                    //Defining variables
                    if(data.hdurl){
                        nasa_apod_image = data.hdurl
                    } else if(data.thumbnail_url){
                        nasa_apod_image = data.thumbnail_url
                    } else{
                        const couldNotFetchImage = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('Error')
                            .setDescription('An error occured while trying to get the image.')

                        message.channel.send(couldNotFetchImage)
                    }
                    nasa_apod_title = data.title
                    nasa_apod_date = data.date
                    nasa_apod_explanation = data.explanation

                })
        } catch(error) {
            const nasaResponseError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("An error occured while fetching information from `api.nasa.gov`")
                .setFooter(`A response has been received from the NASA-API`)
                .addField('Code:', `${nasa_response_error_code}`)
                .setFooter('4xx')

            message.channel.send(nasaResponseError)
            return;
        }
        //Code
        const NASAAPOD = new Discord.MessageEmbed()
            .setColor(`#${nasa_color_hex}`)
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Astronomy Picture of the Day (APOD) from NASA')
            .setDescription(`${nasa_apod_explanation}`)
            .addField(`Title`, `${nasa_apod_title}`, true)
            .addField(`Date taken`, `${nasa_apod_date}`, true)
            .setImage(`${nasa_apod_image}`)
            .setURL(`${nasa_apod_image}`)
            .setFooter('Credit: National Aeronautics and Space Administration Jet Propulsion Laboratory (NASA JPL)')

        message.channel.send(NASAAPOD)
    }
}
