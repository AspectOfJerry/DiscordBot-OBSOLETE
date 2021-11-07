module.exports = async (client) => {
    console.log('Updating Member Count')
    const guild = client.guild.cache.id('631939549332897842')
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('897970123946745886')
        channel.setName(`Total Members: ${memberCount.toLocalString()}`)
        console.log('Updated Member Count')
    }, 10000)
}
