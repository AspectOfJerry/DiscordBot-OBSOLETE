module.exports = {
    name: 'rps',
    aliases: ['rockpaperscissors', 'rock_paper_scissors'],
    description: 'Usage: "%rps"',
    execute(message, args, cmd, client, Discord){

        let filter = m => m.author.id === message.author.id
        message.channel.send('You have 10 seconds to choose between: rock/paper/scissors');
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 10000,
          errors: ['time']
        })
        .then(message => {
          message = message.first()
            if(message.content.toUpperCase() == 'ROCK'){    //If 'message.content' to upper case is equal to "ROCK"
                const rock = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('You loose!')
                    .setDescription("Bot's choice: Paper!")
                    .setFooter(`Input: "${message}".`)

                message.channel.send(rock)
            }
            else if(message.content.toUpperCase() == 'PAPER'){  //If 'message.content' to upper case is equal to "PAPER"
                const paper = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('You loose!')
                    .setDescription("Bot's choice: Scissors!")
                    .setFooter(`Input: "${message}".`)

                message.channel.send(paper)
            }
            else if(message.content.toUpperCase() == 'SCISSORS'){   //If 'message.content' to upper case is equal to "SCISSORS"
                const scissors = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('You loose!')
                    .setDescription("Bot's choice: Rock!")
                    .setFooter(`Input: "${message}".`)

                message.channel.send(scissors)
            }
        })
        .catch(collected => {
            const requestTimeout = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Timeout 0x5B4(1460)')
            .setDescription("Request timeout")

            message.channel.send(requestTimeout)
        });
    }
}