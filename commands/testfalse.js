module.exports = {
    name: 'testfalse',
    cooldown: 10,
    description: "Usage: %testfalse",
    execute(message, args, cmd, client, Discord){
      message.reply('There is currently nothing to test!');
    }
}