const fetch = require('window-fetch')
require('dotenv').config();
const API_KEY = process.env.API_KEY
sqrt = Math.sqrt
round = Math.round

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
        let player_nw_exp
        let player_rank

        //Fetching
        try {
            //Fetching from api.mojang.com
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
                .setFooter(`An error was caught at line 29:11\nmessage.content = ${message.content}`)

            message.channel.send(errorCatch)
            return
        }
        //Fetching from api.hypixel.net
        fetch(`https://api.hypixel.net/player?key=${API_KEY}&uuid=${PLAYER_UUID}`)
            .then(response => response.json())
            .then(data => {
                player_display_name = data.player.displayname
                player_nw_exp = data.player.networkExp
                player_nw_raw_level = (Math.sqrt(player_nw_exp + 15312.5) - 125 / sqrt(2)) / (25 * Math.sqrt(2))
                player_nw_level = Math.round(player_nw_raw_level, 2)
                player_rank = playerRank()
                function playerRank() {
                    let player_rank

                    if(data.player.rank) {
                        if(data.player._id == '516398d00cf273d9c97152c3' || data.player.id == '516398d30cf273d9c97152c4') {
                            player_rank = "[OWNER]"
                        } else if(data.player.rank == 'ADMIN') {
                            player_rank = "[ADMIN]"
                        } else if(data.player.rank == 'GAME_MASTER') {
                            player_rank = "[GM]"
                        } else if(data.player.rank == 'YOUTUBER') {
                            player_rank = "[YOUTUBE]"
                        }
                    } else if(data.player.monthlyPackageRank) {
                        player_rank = "[MVP++]"
                    }
                    else {
                        if(data.player.newPackageRank == 'DEFAULT') {
                            player_rank = "None"
                        } else if(data.player.newPackageRank == 'VIP') {
                            player_rank = "[VIP]"
                        } else if(data.player.newPackageRank == 'VIP_PLUS') {
                            player_rank = "[VIP+]"
                        } else if(data.player.newPackageRank == 'MVP') {
                            player_rank = "[MVP]"
                        } else if(data.player.newPackageRank == 'MVP_PLUS') {
                            player_rank = "[MVP+]"
                        } else {
                            player_rank = "Unknown"
                        }
                    }
                    return player_rank
                }
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
                            .setTitle(`Network stats for ${player_rank} ${player_display_name}`)
                            .addField(`Network Level`, `${player_nw_level}`, true)

                        message.channel.send(networkStats)
                    }
                }
            }
        }, 1000);
    }
}