module.exports = {
    name: 'lockdown',
    aliases: ['lock'],
    cooldown: 15,
    description: 'Usage: "%lockdown"',
    execute(message, args, cmd, client, Discord){
        message.channel.send('This feature is not coded yet!')
    }
}