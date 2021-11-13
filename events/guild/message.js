require('dotenv').config();
module.exports = (Discord, client, message) => {
    const prefix = process.env.PREFIX;

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    try {
        command.execute(message, args, cmd, client, Discord);
    } catch(err) {
        const unknownError = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Unexpected error')
            .setDescription('An unknown error occurred, no further information.')
            .setFooter(`message.content = ${message.content}\nconsole.log(err);`)

        message.reply(unknownError);
        console.log(err);
    }
}
