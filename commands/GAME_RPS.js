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
            if(message.content.toUpperCase() == 'ROCK'){
                message.channel.send('Paper!');
            }
            else if(message.content.toUpperCase() == 'PAPER'){
                message.channel.send('Scissors!');
            }
            else if(message.content.toUpperCase() == 'SCISSORS'){
                message.channel.send('Rock!');
            }
        })
        .catch(collected => {
            message.channel.send('Timeout (408)')
        });
    }
}