const fetch = require('window-fetch')
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY

module.exports = {
    name: 'nasa-mrp',
    aliases: ['mrp', 'mars', 'mars_mrp'],
    description: 'Usage: "%api-contact"',
    async execute(message, args, cmd, client, Discord) {
        let nasa_color_hex = "0b3d91"
        let nasa_mrp_max_date
        let nasa_mrp_name
        let nasa_mrp_max_sol
        let nasa_get_mrp_camera_name
        let nasa_get_mrp_rover_name
        let nasa_mrp_image_url
        let nasa_mrp_rover_name
        let nasa_mrp_camera_name
        let nasa_mrp_camera_full_name
        let nasa_mrp_earth_date

            if(!args[0]){
                const requireValidRoverName = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription(`You need to enter a valid rover name\n`
                    + `Curiosity\n`
                    + `Opportunity\n`
                    + `Spirit`)

                message.channel.send(requireValidRoverName)
            } else{
                if(args[0].toLowerCase().contains('curio')){
                    nasa_get_mrp_rover_name = 'curiosity'
                    if(!args[1]){
                        const requireCamName = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Error - Missing arguments')
                                .setDescription('You need to enter a camera name (FHAZ for default)')
                                .addField('FHAZ', 'Front Hazard Avoidance Camera', true)
                                .addField('RHAZ', 'Rear Hazard Avoidance Camera', true)
                                .addField('MAST', 'Mast Camera', true)
                                .addField('CHEMCAM', 'Chemistry and Camera Complex', true)
                                .addField('MAHLI', 'Mars Hand Lens Imager', true)
                                .addField('MARDI', 'Mars Descent Imager', true)
                                .addField('NAVCAM', 'Navigation Camera', true)
                                .addField('PANCAM', 'Panoramic Camera', true)
                                .addField('MINITES', 'Miniature Thermal Emission Spectrometer', true)

                        message.channel.send(requireCamName)
                    } else {
                        if(args[1].toUpperCase() == 'FHAZ'){
                            nasa_get_mrp_camera_name = 'fhaz'
                        } else if(args[1].toUpperCase() == 'RHAZ'){
                            nasa_get_mrp_camera_name = 'rhaz'
                        } else if(args[1].toUpperCase() == 'MAST'){
                            nasa_get_mrp_camera_name = 'mast'
                        } else if(args[1].toUpperCase() == 'CHEMCAM'){
                            nasa_get_mrp_camera_name = 'chemcam'
                        } else if(args[1].toUpperCase() == 'MAHLI'){
                            nasa_get_mrp_camera_name = 'mahli'
                        } else if(args[1].toUpperCase() == 'MARID'){
                            nasa_get_mrp_camera_name = 'mardi'
                        } else if(args[1].toUpperCase() == 'NAVCAM'){
                            nasa_get_mrp_camera_name = 'navcam'
                        } else if(args[1].toUpperCase() == 'PANCAM'){
                            nasa_get_mrp_camera_name = 'pancam'
                        } else if(args[1].toUpperCase() == 'MINITES'){
                            nasa_get_mrp_camera_name = 'minites'
                        } else {
                            const requireValidCamName = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Error - Invalid arguments')
                                .setDescription('You need to enter a camera name (FHAZ for default)')
                                .addField('FHAZ', 'Front Hazard Avoidance Camera', true)
                                .addField('RHAZ', 'Rear Hazard Avoidance Camera', true)
                                .addField('MAST', 'Mast Camera', true)
                                .addField('CHEMCAM', 'Chemistry and Camera Complex', true)
                                .addField('MAHLI', 'Mars Hand Lens Imager', true)
                                .addField('MARDI', 'Mars Descent Imager', true)
                                .addField('NAVCAM', 'Navigation Camera', true)
                                .addField('PANCAM', 'Panoramic Camera', true)
                                .addField('MINITES', 'Miniature Thermal Emission Spectrometer', true)

                            message.channel.send(requireValidCamName)
                        }

                    fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${nasa_get_mrp_rover_name}/?api_key=${NASA_API_KEY}`)
                        .then(response => response.json())
                        .then(data => {
                            nasa_mrp_name = data.photo_manifest.name
                            nasa_mrp_max_date = data.photo_manifest.max_date
                            nasa_mrp_max_sol = data.photo_manifest.max_sol
                        })

                    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${nasa_mrp_max_date}&camera=${nasa_get_mrp_camera_name}&api_key=${NASA_API_KEY}`)
                        .then(response => response.json())
                        .then(data => {
                            nasa_mrp_image_url = data.photos[0].image_scr
                            nasa_mrp_rover_name = data.photos[0].rover.name
                            nasa_mrp_camera_name = data.photos[0].camera.name
                            nasa_mrp_camera_full_name = data.photos[0].camera.full_name
                        })
                        const NASAMRP = new Discord.MessageEmbed()
                            .setColor(`#${nasa_color_hex}`)
                            .setTitle(`Mars Rover Photos (MRP)`)
                            .setDescription(`This image was taken by ${nasa_mrp_rover_name}'s ${nasa_mrp_camera_full_name} (${nasa_mrp_camera_name}) on ${nasa_mrp_earth_date}.`)
                            .setImage(`${nasa_mrp_image_url}`)
                            .setURL(`${nasa_mrp_image_url}`)
                            .setFooter('Credit: National Aeronautics and Space Administration Jet Propulsion Laboratory (NASA JPL)')

                        message.channel.send(NASAMRP)
                    }
                } else if(args[0].toLowerCase().contains('oppo')){
                    nasa_get_mrp_rover_name = 'opportunity'
                    if(!args[1]){
                        const requireCamName = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Error - Missing arguments')
                                .setDescription('You need to enter a camera name (FHAZ for default)')
                                .addField('FHAZ', 'Front Hazard Avoidance Camera', true)
                                .addField('RHAZ', 'Rear Hazard Avoidance Camera', true)
                                .addField('MAST', 'Mast Camera', true)
                                .addField('CHEMCAM', 'Chemistry and Camera Complex', true)
                                .addField('MAHLI', 'Mars Hand Lens Imager', true)
                                .addField('MARDI', 'Mars Descent Imager', true)
                                .addField('NAVCAM', 'Navigation Camera', true)
                                .addField('PANCAM', 'Panoramic Camera', true)
                                .addField('MINITES', 'Miniature Thermal Emission Spectrometer', true)

                        message.channel.send(requireCamName)
                    } else {
                        if(args[1].toUpperCase() == 'FHAZ'){
                            nasa_get_mrp_camera_name = 'fhaz'
                        } else if(args[1].toUpperCase() == 'RHAZ'){
                            nasa_get_mrp_camera_name = 'rhaz'
                        } else if(args[1].toUpperCase() == 'MAST'){
                            nasa_get_mrp_camera_name = 'mast'
                        } else if(args[1].toUpperCase() == 'CHEMCAM'){
                            nasa_get_mrp_camera_name = 'chemcam'
                        } else if(args[1].toUpperCase() == 'MAHLI'){
                            nasa_get_mrp_camera_name = 'mahli'
                        } else if(args[1].toUpperCase() == 'MARID'){
                            nasa_get_mrp_camera_name = 'mardi'
                        } else if(args[1].toUpperCase() == 'NAVCAM'){
                            nasa_get_mrp_camera_name = 'navcam'
                        } else if(args[1].toUpperCase() == 'PANCAM'){
                            nasa_get_mrp_camera_name = 'pancam'
                        } else if(args[1].toUpperCase() == 'MINITES'){
                            nasa_get_mrp_camera_name = 'minites'
                        } else {
                            const requireValidCamName = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Error - Invalid arguments')
                                .setDescription('You need to enter a camera name (FHAZ for default)')
                                .addField('FHAZ', 'Front Hazard Avoidance Camera', true)
                                .addField('RHAZ', 'Rear Hazard Avoidance Camera', true)
                                .addField('MAST', 'Mast Camera', true)
                                .addField('CHEMCAM', 'Chemistry and Camera Complex', true)
                                .addField('MAHLI', 'Mars Hand Lens Imager', true)
                                .addField('MARDI', 'Mars Descent Imager', true)
                                .addField('NAVCAM', 'Navigation Camera', true)
                                .addField('PANCAM', 'Panoramic Camera', true)
                                .addField('MINITES', 'Miniature Thermal Emission Spectrometer', true)

                            message.channel.send(requireValidCamName)
                        }

                    fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${nasa_get_mrp_rover_name}/?api_key=${NASA_API_KEY}`)
                        .then(response => response.json())
                        .then(data => {
                            nasa_mrp_name = data.photo_manifest.name
                            nasa_mrp_max_date = data.photo_manifest.max_date
                            nasa_mrp_max_sol = data.photo_manifest.max_sol
                        })

                    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${nasa_mrp_max_date}&camera=${nasa_get_mrp_camera_name}&api_key=${NASA_API_KEY}`)
                        .then(response => response.json())
                        .then(data => {
                            nasa_mrp_image_url = data.photos[0].image_scr
                            nasa_mrp_rover_name = data.photos[0].rover.name
                            nasa_mrp_camera_name = data.photos[0].camera.name
                            nasa_mrp_camera_full_name = data.photos[0].camera.full_name
                        })
                        const NASAMRP = new Discord.MessageEmbed()
                            .setColor(`#${nasa_color_hex}`)
                            .setTitle(`Mars Rover Photos (MRP)`)
                            .setDescription(`This image was taken by ${nasa_mrp_rover_name}'s ${nasa_mrp_camera_full_name} (${nasa_mrp_camera_name}) on ${nasa_mrp_earth_date}.`)
                            .setImage(`${nasa_mrp_image_url}`)
                            .setURL(`${nasa_mrp_image_url}`)
                            .setFooter('Credit: National Aeronautics and Space Administration Jet Propulsion Laboratory (NASA JPL)')

                        message.channel.send(NASAMRP)
                    }
                } else if(args[0].toLowerCase().contains('spir')){
                    nasa_get_mrp_rover_name = 'spirit'
                    if(!args[1]){
                        const requireCamName = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Error - Missing arguments')
                                .setDescription('You need to enter a camera name (FHAZ for default)')
                                .addField('FHAZ', 'Front Hazard Avoidance Camera', true)
                                .addField('RHAZ', 'Rear Hazard Avoidance Camera', true)
                                .addField('MAST', 'Mast Camera', true)
                                .addField('CHEMCAM', 'Chemistry and Camera Complex', true)
                                .addField('MAHLI', 'Mars Hand Lens Imager', true)
                                .addField('MARDI', 'Mars Descent Imager', true)
                                .addField('NAVCAM', 'Navigation Camera', true)
                                .addField('PANCAM', 'Panoramic Camera', true)
                                .addField('MINITES', 'Miniature Thermal Emission Spectrometer', true)

                        message.channel.send(requireCamName)
                    } else {
                        if(args[1].toUpperCase() == 'FHAZ'){
                            nasa_get_mrp_camera_name = 'fhaz'
                        } else if(args[1].toUpperCase() == 'RHAZ'){
                            nasa_get_mrp_camera_name = 'rhaz'
                        } else if(args[1].toUpperCase() == 'MAST'){
                            nasa_get_mrp_camera_name = 'mast'
                        } else if(args[1].toUpperCase() == 'CHEMCAM'){
                            nasa_get_mrp_camera_name = 'chemcam'
                        } else if(args[1].toUpperCase() == 'MAHLI'){
                            nasa_get_mrp_camera_name = 'mahli'
                        } else if(args[1].toUpperCase() == 'MARID'){
                            nasa_get_mrp_camera_name = 'mardi'
                        } else if(args[1].toUpperCase() == 'NAVCAM'){
                            nasa_get_mrp_camera_name = 'navcam'
                        } else if(args[1].toUpperCase() == 'PANCAM'){
                            nasa_get_mrp_camera_name = 'pancam'
                        } else if(args[1].toUpperCase() == 'MINITES'){
                            nasa_get_mrp_camera_name = 'minites'
                        } else {
                            const requireValidCamName = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Error - Invalid arguments')
                                .setDescription('You need to enter a camera name (FHAZ for default)')
                                .addField('FHAZ', 'Front Hazard Avoidance Camera', true)
                                .addField('RHAZ', 'Rear Hazard Avoidance Camera', true)
                                .addField('MAST', 'Mast Camera', true)
                                .addField('CHEMCAM', 'Chemistry and Camera Complex', true)
                                .addField('MAHLI', 'Mars Hand Lens Imager', true)
                                .addField('MARDI', 'Mars Descent Imager', true)
                                .addField('NAVCAM', 'Navigation Camera', true)
                                .addField('PANCAM', 'Panoramic Camera', true)
                                .addField('MINITES', 'Miniature Thermal Emission Spectrometer', true)

                            message.channel.send(requireValidCamName)
                        }

                    fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${nasa_get_mrp_rover_name}/?api_key=${NASA_API_KEY}`)
                        .then(response => response.json())
                        .then(data => {
                            nasa_mrp_name = data.photo_manifest.name
                            nasa_mrp_max_date = data.photo_manifest.max_date
                            nasa_mrp_max_sol = data.photo_manifest.max_sol
                        })

                    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${nasa_mrp_max_date}&camera=${nasa_get_mrp_camera_name}&api_key=${NASA_API_KEY}`)
                        .then(response => response.json())
                        .then(data => {
                            nasa_mrp_image_url = data.photos[0].image_scr
                            nasa_mrp_rover_name = data.photos[0].rover.name
                            nasa_mrp_camera_name = data.photos[0].camera.name
                            nasa_mrp_camera_full_name = data.photos[0].camera.full_name
                        })
                        const NASAMRP = new Discord.MessageEmbed()
                            .setColor(`#${nasa_color_hex}`)
                            .setTitle(`Mars Rover Photos (MRP)`)
                            .setDescription(`This image was taken by ${nasa_mrp_rover_name}'s ${nasa_mrp_camera_full_name} (${nasa_mrp_camera_name}) on ${nasa_mrp_earth_date}.`)
                            .setImage(`${nasa_mrp_image_url}`)
                            .setURL(`${nasa_mrp_image_url}`)
                            .setFooter('Credit: National Aeronautics and Space Administration Jet Propulsion Laboratory (NASA JPL)')

                        message.channel.send(NASAMRP)
                    }
                } else {
                    const requireValidRoverName = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription(`You need to enter a valid rover name\n`
                    + `Curiosity\n`
                    + `Opportunity\n`
                    + `Spirit`)

                message.channel.send(requireValidRoverName)
                }
            }
    }
}
