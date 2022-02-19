const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client({intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();


['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Members');
    guildMember.roles.add(welcomeRole).catch(console.error);

    const userJoinMessage = new Discord.MessageEmbed()
        .setColor('#006400')
        .setDescription(`<@${guildMember.user.id}> joined the server!`)

    guildMember.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userJoinMessage)
    guildMember.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userJoinMessage)
});

client.on('guildMemberRemove', guildMember => {
    const userLeaveMessage = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setDescription(`<@${guildMember.user.id}> left the server!`)

    guildMember.guild.channels.cache.find(channel => channel.name.includes('bot-log')).send(userLeaveMessage)
    guildMember.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(userLeaveMessage)
});

client.login(process.env.DISCORD_TOKEN);
