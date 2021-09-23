module.exports = {
    name: 'test1',
    cooldown: 10,
    description: "Usage: %test1",
    execute(message, args, cmd, client, Discord){
      message.reply('There is currently nothing to test!');
    }
}