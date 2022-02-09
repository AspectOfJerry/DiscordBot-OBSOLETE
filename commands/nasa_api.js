const fetch = require('window-fetch')
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY

module.exports = {
    name: 'nasa_api',
    aliases: ['nasa', 'nasaapi', 'nasa-api'],
    description: 'Usage: "%api_contact"',
    async execute(message, args, cmd, client, Discord) {
        //?
        if(args[0] == '?') {
            const helpCommand = new Discord.MessageEmbed()
                .setColor('0000ff')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('%nasa_api command help')
                .setDescription('This comamnd contacts the NASA API and waits for a response.')
                .addField(`Usage`, "`%nasa_api`", true)
                .addField(`Aliases`, "`nasa`, `nasaapi`, `nasa-api`", true)
                .addField("Stats for nerds", "Lines: 77; File size: ~3.45 KB", false)
                .setFooter('This command is not case-sensitive.')

            message.channel.send(helpCommand)
            return;
        }
        //Declaring variables
        let nasa_color_hex = "0b3d91"
        let nasa_response
        let nasa_response_error_code
        //Checklist
        if(!message.member.roles.cache.has(role => role.name === 'BotPl3')) {
            const errorNoPermissions = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(errorNoPermissions)
            return;
        }
        //Code
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
