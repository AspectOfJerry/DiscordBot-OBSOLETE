const fetch = require('window-fetch')
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY

module.exports = {
    name: 'nasa-epic',
    aliases: ['epic', 'nasaepic', 'nasa_epic'],
    description: 'Usage: "%api-contact"',
    async execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
            //     .setColor('0000ff')
            //     .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            //     .setTitle('%nasa_epic command help')
            //     .addField("Stats for nerds", "Lines: ; File size: ~ KB", false)
            //     .setFooter('')

            // message.channel.send(helpCommand)
            message.reply('The help feature is under development for this command.')
            return;
        }
        //Declaring variables
        let nasa_color_hex = "0b3d91"
        let nasa_response
        let nasa_response_error_code
        let nasa_epic_identifier
        let nasa_epic_caption
        let nasa_epic_image_code
        let nasa_epic_formatted_image
        let nasa_epic_full_date
        let nasa_epic_date
        let nasa_epic_formatted_date
        let nasa_epic_full_image_link
        //Code
        try {
            await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    nasa_response = data
                    if(data.error) {
                        nasa_response_error_code = data.error.code
                    }

                    //Defining variables
                    nasa_epic_identifier = data[0].identifier
                    nasa_epic_caption = data[0].caption
                    nasa_epic_image_code = data[0].image
                    nasa_epic_full_date = data[0].date
                    nasa_epic_date = nasa_epic_full_date.split(" ")
                    nasa_epic_formatted_date = nasa_epic_date[0].replaceAll("-", "/")
                    nasa_epic_formatted_image = nasa_epic_image_code + ".png"

                    nasa_epic_full_image_link = `https://api.nasa.gov/EPIC/archive/natural/${nasa_epic_formatted_date}/png/${nasa_epic_formatted_image}?api_key=${NASA_API_KEY}`
                })
        } catch(error) {
            const errorNASAResponse = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error')
                .setDescription("An error occured while fetching information from `api.nasa.gov`")
                .addField('Code:', `${nasa_response_error_code}`)

            message.channel.send(errorNASAResponse)
            return;
        }
        const sendNASAEPIC = new Discord.MessageEmbed()
            .setColor(`#${nasa_color_hex}`)
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('Earth Polychromatic Imaging Camera (EPIC) image from NASA')
            .setDescription(`${nasa_epic_caption}`)
            .addField(`Identifier`, `${nasa_epic_identifier}`, true)
            .addField(`Date taken`, `${nasa_epic_full_date}`, true)
            .setImage(`${nasa_epic_full_image_link}`)
            .setURL(`${nasa_epic_full_image_link}`)
            .setFooter('Credit: National Aeronautics and Space Administration Jet Propulsion Laboratory (NASA JPL)')

        message.channel.send(sendNASAEPIC)
    }
}
