module.exports = {
    name: 'testenable',
    cooldown: 10,
    description: "Usage: %testenable",
    execute(message, args, cmd, client, Discord){
  
      message.reply('There is currently nothing to test!');
    }
}