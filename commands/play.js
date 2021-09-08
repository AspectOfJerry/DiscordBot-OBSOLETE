const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'leave'],
    cooldown: 5,
    description: 'Usage: "%play <URL/keyWords>"',
    async execute(message,args, cmd, client, Discord){
        const antiRickRoll = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('[Rick Roll Detection Module]')
            .setDescription('Failed to execute command! Unauthorized Action.')
            .addField('Reason: ', 'Rick Roll', true)
            .addField('Action: ', `${message.content}`, true)
            .setFooter(`An action was blocked by the [Rick Roll Detection Module].\n%play <args[0]>\n^`)

        //Checking for the voicechannel and permissions.
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send(`🟣 You need to be in a voice channel to execute this command!`);
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send(`🔴 You dont have the correct permissions to execute this command.`);
        if (!permissions.has('SPEAK')) return message.channel.send(`🔴 You dont have the correct permissions to execute this command.`);

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (cmd === 'play'){
            if (!args.length) return message.channel.send('🟣 You need to enter the second argument! Correct usage: "%play <URL/keyWords>".');
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.                
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }
                const video = await video_finder(args.join(' '))
                
                if (video){
                    song = { title: video.title, url: video.url }
                    if(video.title.includes('rick')) return message.channel.send(antiRickRoll);
                    if(video.title.includes('Rick')) return message.channel.send(antiRickRoll);
                    if(video.title.includes('RICK')) return message.channel.send(antiRickRoll);

                    if(video.title.includes('roll')) return message.channel.send(antiRickRoll);
                    if(video.title.includes('Roll')) return message.channel.send(antiRickRoll);
                    if(video.title.includes('ROLL')) return message.channel.send(antiRickRoll);

                    if(video.title.includes('astely')) return message.channel.send(antiRickRoll);
                    if(video.title.includes('Astely')) return message.channel.send(antiRickRoll);
                    if(video.title.includes('ASTELY')) return message.channel.send(antiRickRoll);

                    if(video.title.includes('never gonna give you up')) return message.channel.send(antiRickRoll);
                    if(video.title.includes('Never Gonna Give You Up')) return message.channel.send(antiRickRoll);
                    if(video.title.includes('NEVER GONNA GIVE YOU UP')) return message.channel.send(antiRickRoll);
                } else {
                     message.channel.send('🔴 There was an error while searching for the video.');
                }
            }

            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('🔴 There was an error while connecting.');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`🟢 Added: "**${song.title}**" to queue!`);
            }
        }

        else if(cmd === 'skip') skip_song(message, server_queue);
        else if(cmd === 'leave') stop_song(message, server_queue);
    }
    
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🟢 Now playing: "**${song.title}**"`)
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send(`🟣 You need to be in a voice channel to execute this command!`);
    if(!server_queue){
        return message.channel.send(`🟣 There are no songs in queue`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send(`🟣 You need to be in a voice channel to execute this command!`);
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}