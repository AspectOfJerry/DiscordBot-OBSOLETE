module.exports = {
    name: 'lockdown',
    aliases: ['lock', 'lock-down', 'lock_down'],
    cooldown: 15,
    description: 'Usage: "%lockdown"',
    execute(message, args, cmd, client, Discord){
        message.reply('This feature is planned for the next release!'); return
    }
}