module.exports = {
    name: 'test',
    cooldown: 10,
    description: "Usage: %test",
    execute(message, args, cmd, client, Discord){
      client.interaction = {};
      const DiscordButtons = require('discord-buttons'); //Requiring Discord-BUttons module.
      const ButtonPages = require('discord-button-pages'); //Requiring Discord-Button-Pages module.
      DiscordButtons(client);
      //message.reply('There is currently nothing to test!');

      client.on('clickButton', (button) => {
        ButtonPages.buttonInteractions(button, client.interaction);
      });

      const embed1 = new Discord.MessageEmbed()
      .setColor('#7dc8cd')
      .setTitle('Emebd 1')
      .setDescription('Page one')
      .setFooter('Footer')

      const embed2 = new Discord.MessageEmbed()
      .setColor('#7dc8cd')
      .setTitle('Emebd 2')
      .setDescription('Page one')
      .setFooter('Footer')

      const embed3 = new Discord.MessageEmbed()
      .setColor('#7dc8cd')
      .setTitle('Emebd 3')
      .setDescription('Page one')
      .setFooter('Footer')

      const embed4 = new Discord.MessageEmbed()
      .setColor('#7dc8cd')
      .setTitle('Emebd 4')
      .setDescription('Page one')
      .setFooter('Footer')

      const embed5 = new Discord.MessageEmbed()
      .setColor('#7dc8cd')
      .setTitle('Emebd 5')
      .setDescription('Page one')
      .setFooter('Footer')

      const embedPages = [embed1, embed2, embed3, embed4, embed5]
      ButtonPages.createPages(client.interaction, message, embedPages, 60 * 1000, "green", "👉", "👈", "❌")
    }
}