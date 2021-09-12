module.exports = {
    name: 'test',
    cooldown: 10,
    description: "Usage: %test",
    execute(message, args, cmd, client, Discord){
      message.reply('There is currently nothing to test!');
    }
}