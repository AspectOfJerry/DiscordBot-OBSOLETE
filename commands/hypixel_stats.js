const fetch = require('window-fetch')
require('dotenv').config();

const API_KEY = process.env.API_KEY

module.exports = {
    name: 'stats',
    description: 'Usage: "%api-contact"',
    async execute(message, args, cmd, client, Discord) {
        const PLAYER_NAME = args[0]
        const gameType = args[1]
        const gameMode = args[2]
        let PLAYER_UUID
        let mojang_response
        let player
        let player_display_name
        let player_nw_level
        let player_rank

        //Fetching
        try {
            //Fetching from api.mojang.com
            await fetch(`https://api.mojang.com/users/profiles/minecraft/${PLAYER_NAME}`)
                .then(response => response.json())
                .then(data => {
                    mojang_response = data
                    PLAYER_UUID = mojang_response
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
        fetch(`https://api.hypixel.net/player?key=${API_KEY}&uuid=216fc23b7a4647a89e7a3a60d76356cd`)
            .then(response => response.json())
            .then(data => {
                player = data
                player_display_name = player.player.displayname
                player_rank = player.player.newPackageRank
                //Code here
            })
            .catch(console.error())
        setTimeout(() => {
            if(!args[2]) {
                if(!args[1]) {
                    if(!args[0]) {
                        const statsCommandArguments = new Discord.MessageEmbed()
                            .setColor('7dc8cd')
                            .setTitle('Stats command arguments')
                            .setDescription('Command usage: `%stats <username> (<gameType> <gameMode>)`')
                            .addField(`bedwars/bw`, `Bedwars stats`, true)
                            .addField(`skywars/sw`, `Skywars stats`, true)
                            .addField(`duels/duel/pvp`, `Duel stats`, true)

                        message.channel.send(statsCommandArguments)
                    } else {
                        const networkStats = new Discord.MessageEmbed()
                            .setColor('7dc8cd')
                            .setTitle(`Network stats for ${PLAYER_NAME}`)
                            .addField(`Display name`, `${player_display_name}`, true)
                            .addField(`Rank`, `${player_rank}`)

                        message.channel.send(networkStats)
                    }
                }
            }
        }, 1000);
    }
}