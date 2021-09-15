module.exports = {
    name: 'error',
    cooldown: 10,
    description: 'Usage: "%error"',
    execute(message, args, cmd, client, Discord){
        try{
            message.channel.send(errorTesting)  //Try to send 'errorTesting' that is not declared resulting in an error.
        }
        catch(error){   //Catch the error to prevent the code from breaking
            const errorHandler = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('ReferenceError')
                .setDescription('ReferenceError: errorTesting is not defined')

            message.channel.send(errorHandler)
        }
    }
}