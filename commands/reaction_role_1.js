module.exports = {
    name: 'reactionrole1',
    aliases: ['reaction1', 'rr1'],
    description: 'Usage: "%reactionrole1"',
    async execute(message, args, cmd, client, Discord) {
        if(message.member.roles.cache.find(role => role.name === 'BotPR3')) {
            const channel = '801272037732646952'
            const MinecraftJavaRole = message.guild.roles.cache.find(role => role.name === 'Minecraft Java')
            const MinecraftBedrockRole = message.guild.roles.cache.find(role => role.name === 'Minecraft Bedrock')
            const HypixelRole = message.guild.roles.cache.find(role => role.name === 'Hypixel')
    
            const MinecraftJavaEmoji = '1️⃣'
            const MinecraftBedrockEmoji = '2️⃣'
            const HypixelEmoji = '3️⃣'
    
            const reactionRole1 = new Discord.MessageEmbed()
                .setColor('#7dc8cd')
                .setTitle('React to get the following roles!')
                .setDescription(`Choose if you play Minecraft Java, Minecraft Bedrock, or play on the Hypixel network\n`
                    + `${MinecraftJavaEmoji} for Minecraft Java Edition\n`
                    + `${MinecraftBedrockEmoji} for Minecraft Bedrock Edition\n`
                    + `${HypixelEmoji} for the Hypixel Network`)
                .setFooter('This message has to be resent every bot restart')
    
    
            await message.channel.messages.fetch({limit: 1}).then(messages => {
                message.channel.bulkDelete(messages).catch(console.error);
            });
    
            let MessageEmbed = await message.channel.send(reactionRole1)
            MessageEmbed.react(MinecraftJavaEmoji)
            MessageEmbed.react(MinecraftBedrockEmoji)
            MessageEmbed.react(HypixelEmoji)
    
            client.on('messageReactionAdd', async (reaction, user) => {
                if(reaction.message.partial) await reaction.fetch();
                if(reaction.partial) await reaction.fetch();
                if(user.bot) return;
                if(!reaction.message.guild) return
    
                if(reaction.message.channel.id == channel) {
                    if(reaction.emoji.name === MinecraftJavaEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(MinecraftJavaRole)
                    }
                    if(reaction.emoji.name === MinecraftBedrockEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(MinecraftBedrockRole)
                    }
                    if(reaction.emoji.name === HypixelEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(HypixelRole)
                    }
                } else {
                    return;
                }
            });
    
            client.on('messageReactionRemove', async (reaction, user) => {
                if(reaction.message.partial) await reaction.fetch();
                if(reaction.partial) await reaction.fetch();
                if(user.bot) return;
                if(!reaction.message.guild) return
    
                if(reaction.message.channel.id == channel) {
                    if(reaction.emoji.name === MinecraftJavaEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(MinecraftJavaRole)
                    }
                    if(reaction.emoji.name === MinecraftBedrockEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(MinecraftBedrockRole)
                    }
                    if(reaction.emoji.name === HypixelEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(HypixelRole)
                    }
                } else {
                    return;
                }
            });
        } else {
            const permissionsError = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('Permissions error')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send(permissionsError)
        }
    }
}
