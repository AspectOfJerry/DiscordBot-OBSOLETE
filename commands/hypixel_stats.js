const fetch = require('window-fetch')
require('dotenv').config();

const API_KEY = process.env.API_KEY

module.exports = {
    name: 'stats',
    description: 'Usage: "%api-contact"',
    async execute(message, args, cmd, client, Discord) {
        const PLAYER_NAME = args[0]
        let PLAYER_UUID
        let mojang_response
        let player

        //Fetching
        try {
            //Fetching from api.mojang.com
            const fetchingFromMojang = new Discord.MessageEmbed()
                .setColor('#ffff00')
                .setTitle('Fetching')
                .setDescription(`Fetching from:\nhttps://api.mojang.com/users/profiles/minecraft/${PLAYER_NAME}`)

            message.channel.send(fetchingFromMojang)
            await fetch(`https://api.mojang.com/users/profiles/minecraft/${PLAYER_NAME}`)
                .then(response => response.json())
                .then(data => {
                    mojang_response = data
                    PLAYER_UUID = mojang_response.id
                })
        } catch(error) {
            const errorCatch = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Error Catch')
                .setDescription('An error occured while searching for the player.\nMake sure the player is existing.')
                .setFooter(`An error was caught at line 23:11\nmessage.content = ${message.content}`)

            message.channel.send(errorCatch)
            return
        }
        //Fetching from api.hypixel.net
        const fetchingFromHypixel = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setTitle('Fetching')
            .setDescription(`Fetching from:\nhttps://api.hypixel.net/player?key=${API_KEY}&uuid=${PLAYER_UUID}`)

        message.channel.send(fetchingFromHypixel)
        fetch(`https://api.hypixel.net/player?key=${API_KEY}&uuid=${PLAYER_UUID}`)
            .then(response => response.json())
            .then(data => {
                player = data
            })
            .catch(console.error())

        await message.channel.messages.fetch({limit: 2}).then(messages => {
            message.channel.bulkDelete(messages).catch(console.error);
        })
    }
}