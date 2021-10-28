const fetch = require('window-fetch')
require('dotenv').config();
const API_KEY = process.env.API_KEY


const {round} = require('mathjs')
const {sqrt} = require('mathjs')
const {toFixed} = require('mathjs')
const {toLocaleString} = require('mathjs')

module.exports = {
    name: 'stats',
    description: 'Usage: "%api-contact"',
    async execute(message, args, cmd, client, Discord) {
        const PLAYER_NAME = args[0]
        const gameType = args[1]
        const gameMode = args[2]
        let PLAYER_UUID
        let mojang_response
        let player_is_null
        let player_rank_color
        let player_bedwars_prestige_color
        let player_first_login_unix
        let player_first_login_time
        let player_last_logout_unix
        let player_last_logout_time
        let player_display_name
        let player_network_level
        let player_network_experience
        let player_rank
        let player_karma
        let player_achievement_points
        let player_bedwars_experience

        let player_channel
        let player_status
        let player_status_game_type
        let player_status_game_mode
        let player_status_game_map
        //player_bedwars
        let player_bedwars_level
        let player_ranks_given
        //player_bedwars_overall
        let player_bedwars_overall_kills
        let player_bedwars_overall_deaths
        let player_bedwars_overall_final_kills
        let player_bedwars_overall_final_deaths
        let player_bedwars_coins
        let player_bedwars_overall_winstreak
        let player_bedwars_overall_kill_death_ratio
        let player_bedwars_overall_final_kill_death_ratio
        let player_bedwars_overall_wins
        let player_bedwars_overall_losses
        let player_bedwars_overall_win_loss_ratio
        //player_bedwars_eight_one
        let player_bedwars_eight_one_wins
        let player_bedwars_eight_one_losses
        //player_bedwars_eight_two
        let player_bedwars_eight_two_wins
        let player_bedwars_eight_two_losses
        //player_bedwars_four_three

        //player_bedwars_four_four

        //player_bedwars_two_four


        //player_skywars
        let player_skywars_experience
        let player_skywars_level
        //player_skywars_overall
        let player_skywars_overall_kills
        let player_skywars_overall_deaths
        let player_skywars_overall_wins
        let player_skywars_overall_games
        let player_skywars_overall_winstreak
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
        fetch(`https://api.hypixel.net/status?key=${API_KEY}&uuid=${PLAYER_UUID}`)
            .then(response => response.json())
            .then(data => {
                if(data.player == null) {
                    const playerIsNull = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Error')
                        .setDescription('The player is existing but they have never logged into Hypixel.')

                    message.channel.send(playerIsNull)

                    player_is_null = true
                    return;
                } else {
                    player_status = playerStatus()

                    function playerStatus() {
                        let player_status
                        if(data.session.online == true) {
                            player_status = "Online"
                            player_status_game_type = playerStatusGameType()
                            player_status_game_mode = playerStatusGameMode()
                            player_status_game_map = playerStatusGameMap()

                            function playerStatusGameType() {
                                let player_status_game_type

                                player_status_game_type = data.session.gameType

                                return player_status_game_type
                            }

                            function playerStatusGameMode() {
                                let player_status_game_mode

                                player_status_game_mode = data.session.mode

                                return player_status_game_mode
                            }


                            function playerStatusGameMap() {
                                if(data.session.map) {
                                    let player_status_game_map

                                    player_status_game_map = data.session.map
                                } else {
                                    player_status_game_map = "N/A"
                                }
                                return player_status_game_map
                            }

                            return player_status
                        } else {
                            player_status = "Offline"
                            player_status_game_type = "N/A"
                            player_status_game_mode = "N/A"
                            player_status_game_map = "N/A"

                            return player_status
                        }
                    }
                }
            })
            .catch(console.error)

        fetch(`https://api.hypixel.net/player?key=${API_KEY}&uuid=${PLAYER_UUID}`)
            .then(response => response.json())
            .then(data => {
                if(data.player == null) {
                    // const playerIsNull = new Discord.MessageEmbed()
                    //     .setColor('#ff0000')
                    //     .setTitle('Error')
                    //     .setDescription('The player is existing but they have never logged into Hypixel.')

                    // message.channel.send(playerIsNull)

                    player_is_null = true
                    return;
                } else {
                    player_display_name = data.player.displayname
                    player_network_experience = data.player.networkExp
                    player_network_level = (Math.sqrt(player_network_experience + 15312.5) - 125 / sqrt(2)) / (25 * Math.sqrt(2))

                    player_rank = playerRank()
                    player_channel = playerChannel()
                    //player_first_login_time = playerFirstLoginTime()
                    player_karma = data.player.karma
                    player_achievement_points = data.player.achievementPoints
                    player_bedwars_experience = data.player.stats.Bedwars.Experience
                    player_bedwars_overall_kills = data.player.stats.Bedwars.kills_bedwars
                    player_bedwars_overall_deaths = data.player.stats.Bedwars.deaths_bedwars
                    player_bedwars_coins = data.player.stats.Bedwars.coins
                    player_bedwars_overall_winstreak = data.player.stats.Bedwars.winstreak
                    player_bedwars_overall_kill_death_ratio = player_bedwars_overall_kills / player_bedwars_overall_deaths;
                    player_bedwars_overall_final_kills = data.player.stats.Bedwars.final_kills_bedwars
                    player_bedwars_overall_final_deaths = data.player.stats.Bedwars.final_deaths_bedwars
                    player_bedwars_overall_final_kill_death_ratio = player_bedwars_overall_final_kills / player_bedwars_overall_final_deaths;
                    player_bedwars_overall_wins = data.player.achievements.bedwars_wins


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
                        return player_bedwars_level + expWithoutPrestiges / 5000
                    }

                    //player_rank
                    function playerRank() {
                        let player_rank

                        if(data.player.rank) {
                            if(data.player._id == '516398d00cf273d9c97152c3' || data.player.id == '516398d30cf273d9c97152c4') {
                                player_rank = "[OWNER]"
                                player_rank_color = "#ff5555"
                            } else if(data.player.rank == 'ADMIN') {
                                player_rank = "[ADMIN]"
                                player_rank_color = "#ff5555"
                            } else if(data.player.rank == 'GAME_MASTER') {
                                player_rank = "[GM]"
                                player_rank_color = "#00aa00"
                            } else if(data.player.rank == 'YOUTUBER') {
                                player_rank = "[YOUTUBE]"
                                player_rank_color = "#ff5555"
                            }
                        } else if(data.player.monthlyPackageRank) {
                            player_rank = "[MVP++]"
                            player_rank_color = "#ffaa00"
                        }
                        else {
                            if(!data.player.newPackageRank) {
                                player_rank = "[NoRank]"
                                player_rank_color = "#aaaaaa"
                            } else if(data.player.newPackageRank == 'VIP') {
                                player_rank = "[VIP]"
                                player_rank_color = "#55ff55"
                            } else if(data.player.newPackageRank == 'VIP_PLUS') {
                                player_rank = "[VIP+]"
                                player_rank_color = "#55ff55"
                            } else if(data.player.newPackageRank == 'MVP') {
                                player_rank = "[MVP]"
                                player_rank_color = "#55ffff"
                            } else if(data.player.newPackageRank == 'MVP_PLUS') {
                                player_rank = "[MVP+]"
                                player_rank_color = "#55ffff"
                            } else {
                                player_rank = "[UnknownRank]"
                            }
                        }
                        return player_rank
                    }

                    function playerChannel() {
                        let player_channel

                        if(data.player.channel == 'ALL') {
                            player_channel = 'All'
                        } else if(data.player.channel == 'PARTY') {
                            player_channel = 'Party'
                        } else if(data.player.channel == 'GUILD') {
                            player_channel = 'Guild'
                        } else if(data.player.channel == 'SKYBLOCK_COOP') {
                            player_channel = 'Skyblock Coop'
                        }
                        return player_channel
                    }
                }
            })
            .catch(console.error())
        setTimeout(() => {
            if(player_is_null == true) {
                // const playerIsNull = new Discord.MessageEmbed()
                //     .setColor('#ff0000')
                //     .setTitle('Error')
                //     .setDescription('The player is existing but they have never logged into Hypixel.')

                // message.channel.send(playerIsNull)

                player_is_null = true
                return;
            } else {
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
                                .setColor(`${player_rank_color}`)
                                .setTitle(`Hypixel network stats for ${player_rank}${player_display_name}`)
                                .setDescription(`**${player_rank}${player_display_name}** is __${player_status}__. They first joined on __coming soon__ and is currently Hypixel __Netowrk level ${player_network_level.toFixed(2).toLocaleString()}__. They are currently __playing ${player_status_game_type}__ in ${player_status_game_mode}. `)
                                .addField(`Network Level`, `${player_network_level.toFixed(2).toLocaleString()} (${player_network_experience.toLocaleString()} exp)`, true)
                                .addField(`Karma`, `${player_karma.toLocaleString()}`, true)
                                .addField(`Achievement points`, `${player_achievement_points.toLocaleString()}`, true)
                                .addField(`First login`, `Coming soon`, true)
                                .addField(`Last logout`, `Coming soon`, true)
                                .addField(`Status`, `${player_status}`, true)
                                .addField(`Game type`, `${player_status_game_type}`, true)
                                .addField(`Game mode`, `${player_status_game_mode}`, true)
                                .addField(`Game map`, `${player_status_game_map}`, true)
                                .addField(`Current channel`, `${player_channel}`, true)


                            message.channel.send(networkStats)
                        }
                    } else {
                        if(args[1] == 'bw' || args[1] == 'bedwars') {
                            const overallBedwars = new Discord.MessageEmbed()
                                .setColor(`${player_rank_color}`)
                                .setTitle(`Overall Bedwars stats for ${player_rank}${player_display_name}`)
                                .setDescription(`**${player_rank}${player_display_name}** is currently __Bedwars level ${player_bedwars_level.toFixed(2).toLocaleString()}__; has __${player_bedwars_overall_final_kills.toLocaleString()} final kills__; and has an __FKDR of ${player_bedwars_overall_final_kill_death_ratio.toFixed(2).toLocaleString()}__`)
                                .addField(`Bedwars Level`, `${player_bedwars_level.toFixed(2).toLocaleString()} (${player_bedwars_experience.toLocaleString()} exp)`, true)
                                .addField(`Coins`, `${player_bedwars_coins.toLocaleString()}`, true)
                                .addField(`Overall winstreak`, `${player_bedwars_overall_winstreak.toLocaleString()}`, true)
                                .addField(`Bedwars kills`, `${player_bedwars_overall_kills.toLocaleString()}`, true)
                                .addField(`Bedwars deaths`, `${player_bedwars_overall_deaths.toLocaleString()}`, true)
                                .addField(`Bedwars KDR`, `${player_bedwars_overall_kill_death_ratio.toFixed(2).toLocaleString()}`, true)
                                .addField(`Bedwars final kills`, `${player_bedwars_overall_final_kills.toLocaleString()}`, true)
                                .addField(`Bedwars final deaths`, `${player_bedwars_overall_final_deaths.toLocaleString()}`, true)
                                .addField(`Bedwars FKDR`, `${player_bedwars_overall_final_kill_death_ratio.toFixed(2).toLocaleString()}`, true)
                                .addField(`Bedwars wins`, `${player_bedwars_overall_wins.toLocaleString()}`, true)
                                .addField(`Bedwars losses`, `Coming soon`, true)
                                .addField(`Bedwars WLR`, `Coming soon`, true)

                            message.channel.send(overallBedwars)
                        }
                    }
                }
            }
        }, 1000);
    }
}