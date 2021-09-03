module.exports = {
    name: 'testglobal',
    cooldown: 10,
    description: "Usage: %testglobal",
    execute(message, args, cmd, client, Discord){
      
      message.channel.reply('There is currently nothing to test!');
    }
}