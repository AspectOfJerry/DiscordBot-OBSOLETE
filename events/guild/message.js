require('dotenv').config();
module.exports = (Discord, client, message) => {
    const prefix = process.env.PREFIX;

    if(message.author.bot) return;
    //Code to execute if a message message is sent but not from the bot

    //
    if(message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).split(" ");
        const cmd = args.shift().toLowerCase();

        const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

        try {
            command.execute(message, args, cmd, client, Discord);
        } catch(err) {
            const unknownError = new Discord.MessageEmbed()
                .setColor('#800080')
                .setDescription('Unexpected error, no further information.')
                .setFooter(`message.content = ${message.content}`)

            message.reply(unknownError);
            console.log(err);
        }
    }
}
