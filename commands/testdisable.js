module.exports = {
    name: 'tesdisable',
    cooldown: 10,
    description: "Usage: %testdisable",
    execute(message, args, cmd, client, Discord){
  
      message.reply('There is currently nothing to test!');
    }
}