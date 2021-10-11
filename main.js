const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})



client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.get('890065114865238018')
    guildMember.roles.add(welcomeRole).catch(console.error);
});

client.on('guildMemberRemove', guildMember => {
    guildMember.guild.channels.cache.get('890067108287873094').send(userLeaveMessage)
});

client.login(process.env.DISCORD_TOKEN);