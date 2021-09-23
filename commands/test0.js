module.exports = {
    name: 'test0',
    cooldown: 10,
    description: "Usage: %test0",
    execute(message, args, cmd, client, Discord){
      message.reply('There is currently nothing to test!');
    }
}