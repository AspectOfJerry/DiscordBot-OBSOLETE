const fetch = require('window-fetch')
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY

module.exports = {
    name: 'nasa-insight',
    aliases: ['insight', 'nasainsight', 'nasa_insight', 'marsweather', 'mars_weather', 'mars-weather', 'mars'],
    description: 'Usage: "%api-contact"',
    async execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
            //     .setColor('0000ff')
            //     .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            //     .setTitle('')
            //     .setFooter('')

            // message.channel.send(helpCommand)
            message.reply('The help feature is under development for this command.')
            return;
        }
        //Code
        message.channel.send('This command is currently under developement'); return;
        let nasa_color_hex = "0b3d91"
        // let nasa_response
        // let nasa_response_error_code
        // try {
        //     await fetch(`https://api.nasa.gov/planetary/apod?thumbs=true&api_key=${NASA_API_KEY}`)
        //         .then(response => response.json())
        //         .then(data => {
        //             nasa_response = data

        //             if(data.error) {
        //                 nasa_response_error_code = data.error.code
        //             }

        //             //Defining variables
        //             nasa_apod_hdurl = data.hdurl
        //             nasa_apod_title = data.title
        //             nasa_apod_date = data.date
        //             nasa_apod_explanation = data.explanation

        //         })
        // } catch(error) {
        //     const nasaResponseError = new Discord.MessageEmbed()
        //         .setColor('#ff0000')
        //         .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
        //         .setTitle('Error')
        //         .setDescription("An error occured while fetching information from `api.nasa.gov`")
        //         .setFooter(`A response has been received from the NASA-API`)
        //         .addField('Code:', `${nasa_response_error_code}`)
        //         .setFooter('4xx')

        //     message.channel.send(nasaResponseError)
        //     return;
        // }

    }
}
