const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})



client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Members');

    guildMember.roles.add(welcomeRole).catch(console.error);
    const userJoinMessage = new Discord.MessageEmbed()
    .setColor('#006400')
    .setTitle('User join')
    .setDescription(`<@${guildMember.user.id}> joined the server!`)
    .setFooter('Welcome!')

    guildMember.guild.channels.cache.get('874419074535415848').send(userJoinMessage)
    guildMember.guild.channels.cache.get('857850833982193665').send(userJoinMessage)
});

client.on('guildMemberRemove', guildMember =>{
    const userLeaveMessage = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTitle('User leave')
    .setDescription(`<@${guildMember.user.id}> left the server!`)
    .setFooter('Goodbye!')

    guildMember.guild.channels.cache.get('874419074535415848').send(userLeaveMessage)
    guildMember.guild.channels.cache.get('857850833982193665').send(userLeaveMessage)
});
    //client.user.setActivity('Visual Studio Code', { type: 'PLAYING'}).catch(console.error)
    //client.user.setActivity().catch(console.error)

client.login(process.env.DISCORD_TOKEN);
