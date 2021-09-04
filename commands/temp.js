module.exports = {
    name: 'temp',
    description: 'Usage: "%ping"',
    execute(message, args, cmd, client, Discord){
        message.channel.reply('temp.js')
    }
}