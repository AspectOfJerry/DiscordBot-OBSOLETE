module.exports = {
    name: 'lockdown',
    aliases: ['lock', 'lock-down', 'lock_down'],
    cooldown: 15,
    description: 'Usage: "%lockdown"',
    execute(message, args, cmd, client, Discord){
        message.reply('This feature will be add on the next release!'); return
    }
}