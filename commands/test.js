const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'test',
    cooldown: 10,
    description: "Usage: %test",
    execute(message, args, cmd, client, Discord){
      const target = message.mentions.users.first();
      const memberTarget = message.guild.members.cache.get(target.id);
      const testMessage = new Discord.MessageEmbed()
        .setColor('#ffff00')
        .setTitle('Test')
        .setDescription('The next messages are for testing.')
      message.channel.send(testMessage)
      //message.reply('There is currently nothing to test!');


      // const methods = new Discord.MessageEmbed()
      //   .setColor('#00ff00')
      //   .setTitle('.setTitle')
      //   .setURL('https://discord.com')
      //   .setAuthor(`${message.member}`, '')
      //   .setDescription('.setDescription')
      //   .setThumbnail('')
      //   .setImage('')
      //   .setTimestamp()
      //   .setFooter('.setFooter')

      // message.channel.send(methods)

      try{
        const ban = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setThumbnail(`${message.author.avatarURL({ dynamic: true, size: 32 })}`)
          .setTitle('User ban')
          .setDescription(`<@${memberTarget.user.id}> was banned from the guild by <@${message.member.user.id}>`)
          .setImage(`${memberTarget.user.avatarURL({ dynamic: true , size: 64 , inline: true})}`)

        message.channel.send(ban)
        return;
      } catch(error){
        //Do nothing after catch
      } try{
        const banNoHeaderAvatar = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setTitle('User ban')
          .setDescription(`<@${memberTarget.user.id}> was banned from the guild by <@${message.member.user.id}>`)
          .setImage(`${memberTarget.user.avatarURL({ dynamic: true , size: 64 , inline: true})}`)

        message.channel.send(banNoHeaderAvatar)
        return;
      } catch(error){
        //Do nothing after catch
      } try{
        const banNoFooterAvatar = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setThumbnail(`${message.author.avatarURL({ dynamic: true, size: 32 })}`)
          .setTitle('User ban')
          .setDescription(`<@${memberTarget.user.id}> was banned from the guild by <@${message.member.user.id}>`) 

        message.channel.send(banNoFooterAvatar)
        return;
      } catch{
        //Do nothing after catch
      } try{
        const banNoAvatar = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setTitle('User ban')
          .setDescription(`<@${memberTarget.user.id}> was banned from the guild by <@${message.member.user.id}>`)

        message.channel.send(banNoAvatar)
        return;
      } catch{
        //Do nothing after catch
      }      
    }
}