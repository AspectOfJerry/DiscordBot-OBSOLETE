module.exports = {
    name: 'testglobal',
    cooldown: 10,
    description: "Usage: %testglobal",
    execute(message, args, cmd, client, Discord){
      //message.channel.send('There is currently nothing to test!');
      const requireArgs0 = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Error: "' + message.content + '"')
      .setDescription("Invalid command! You must enter a value! Correct usage: %purge <value>.")
      .setFooter('449 RETRY_WITH')

      if(!args[0]) return message.reply(requireArgs0);
      
      if(message.content.includes('RICK')) return message.channel.send('rick roll detected');
    }
}