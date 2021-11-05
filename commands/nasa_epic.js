const fetch = require('window-fetch')
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY

module.exports = {
    name: 'nasa-epic',
    aliases: ['epic', 'nasaepic', 'nasa_epic'],
    description: 'Usage: "%api-contact"',
    async execute(message, args, cmd, client, Discord) {
        let nasa_color_hex = "0b3d91"
        let nasa_response
        let nasa_response_error_code
        let nasa_epic_identifier
        let nasa_epic_caption
        let nasa_epic_image
        let nasa_epic_formatted_image
        let nasa_epic_full_date
        let nasa_epic_date
        let nasa_epic_formatted_date

        try {
            await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    nasa_response = data

                    if(data.error) {
                        nasa_response_error_code = data.error.code
                    }

                    //Defining variables
                    nasa_epic_identifier = data.identifier
                    nasa_epic_caption = data.caption
                    nasa_epic_image = data.image
                    nasa_epic_date = data.date
                    nasa_epic_date = nasa_epic_full_date.split(" ")
                    nasa_epic_formatted_date = nasa_epic_date[0].replace("-", "/")
                    nasa_epic_formatted_image = nasa_epic_image + ".png"
                })

                fetch(`https://api.nasa.gov/EPIC/archive/natural/${nasa_epic_formatted_date}/png/${nasa_epic_formatted_image}?api_key=${NASA_API_KEY}`)
                    .then(response => response.json())
                    .then(data => {
                        
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
    }
}
