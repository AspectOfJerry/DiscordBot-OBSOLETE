const fetch = require('window-fetch')
require('dotenv').config();
const API_KEY = process.env.API_KEY


const {round} = require('mathjs')
const {sqrt} = require('mathjs')

module.exports = {
    name: 'stats',
    description: 'Usage: "%api-contact"',
    async execute(message, args, cmd, client, Discord) {
        const PLAYER_NAME = args[0]
        const gameType = args[1]
        const gameMode = args[2]
        let PLAYER_UUID
        let mojang_response
        let player_display_name
        let player_nw_level
        let player_nw_experience
        let player_rank
        let player_karma
        let player_achievement_points
        let player_bedwars_experience
        let player_bedwars_level
        let player_ranks_given
        let player_bedwars_kills
        let player_bedwars_deaths
        let player_bedwars_final_kills
        let player_bedwars_final_deaths
        const EASY_LEVELS = 4;
        const EASY_LEVELS_XP = 7000;
        const XP_PER_PRESTIGE = 96 * 5000 + EASY_LEVELS_XP;
        const LEVELS_PER_PRESTIGE = 100;
        const HIGHEST_PRESTIGE = 10;

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
                player_nw_experience = data.player.networkExp
                player_nw_raw_level = (Math.sqrt(player_nw_experience + 15312.5) - 125 / sqrt(2)) / (25 * Math.sqrt(2))
                player_nw_level = Math.round(player_nw_raw_level, 2)
                player_rank = playerRank()
                player_karma = data.player.karma
                player_achievement_points = data.player.achievementPoints
                player_bedwars_experience = data.player.stats.Bedwars.Experience
                player_bedwars_kills = data.player.stats.Bedwars.kills_bedwars
                player_bedwars_deaths = data.player.stats.Bedwars.deaths_bedwars
                //player_ranks_given = data.player.giftingMeta.ranksGiven
                

                //player_bedwars_level
                //The following is Plancke's code from his github
                player_bedwars_level = getLevelForExp(player_bedwars_experience);


                function getExpForLevel(player_bedwars_level) {
                    if(player_bedwars_level == 0) return 0;

                    var respectedLevel = getLevelRespectingPrestige(player_bedwars_level);
                    if(respectedLevel > EASY_LEVELS) {
                        return 5000;
                    }

                    switch(respectedLevel) {
                        case 1:
                            return 500;
                        case 2:
                            return 1000;
                        case 3:
                            return 2000;
                        case 4:
                            return 3500;
                    }
                    return 5000;
                }

                function getLevelRespectingPrestige(player_bedwars_level) {
                    if(player_bedwars_level > HIGHEST_PRESTIGE * LEVELS_PER_PRESTIGE) {
                        return player_bedwars_level - HIGHEST_PRESTIGE * LEVELS_PER_PRESTIGE;
                    }
                    else {
                        return player_bedwars_level % LEVELS_PER_PRESTIGE;
                    }
                }

                function getLevelForExp(exp) {
                    var prestiges = Math.floor(exp / XP_PER_PRESTIGE);
                    var player_bedwars_level = prestiges * LEVELS_PER_PRESTIGE;
                    var expWithoutPrestiges = exp - (prestiges * XP_PER_PRESTIGE);

                    for(let i = 1; i <= EASY_LEVELS; ++i) {
                        var expForEasyLevel = getExpForLevel(i);
                        if(expWithoutPrestiges < expForEasyLevel) {
                            break;
                        }
                        player_bedwars_level++;
                        expWithoutPrestiges -= expForEasyLevel;
                    }
                    //returns players bedwars level, remove the Math.floor if you want the exact bedwars level returned
                    return Math.round(player_bedwars_level + expWithoutPrestiges / 5000);
                }

                //player_rank
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
                            .setTitle(`Hypixel Network stats for ${player_rank} ${player_display_name}`)
                            .addField(`Network Level`, `${player_nw_level.toLocaleString()} (${player_nw_experience.toLocaleString()} exp)`, true)
                            .addField(`Karma`, `${player_karma.toLocaleString()}`, true)
                            .addField(`Achievement points`, `${player_achievement_points.toLocaleString()}`, true)
                            

                        message.channel.send(networkStats)
                    }
                } else {
                    if(args[1] == 'bw' || args[1] == 'bedwars') {
                        const overallBedwars = new Discord.MessageEmbed()
                            .setColor('7dc8cd')
                            .setTitle(`Overall Bedwars stats for ${player_rank} ${player_display_name}`)
                            .addField(`Bedwars Level`, `${player_bedwars_level.toLocaleString()} (${player_bedwars_experience.toLocaleString()} exp)`, true)
                            .addField(`Bedwars kills`, `${player_bedwars_kills}`, true)
                            .addField(`Bedwars deaths`, `${player_bedwars_deaths}`, true)

                        message.channel.send(overallBedwars)
                    }
                }
            }
        }, 1000);
    }
}