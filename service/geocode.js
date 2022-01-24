const request = require('request')
const fs = require('fs')

const secret = JSON.parse(fs.readFileSync('./secret.json'))

const geocode = (address, callback) => {
    // geocoding API request
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + secret.mapbox_token + '&limit=1'

    request({url: geocodeUrl, json: true}, (error, response) => {
        if (error) {
            callback('Cannot connect to the geolocation API! Please try again later...', undefined)
        } else if (response.body.error) {
            callback('Unable to search the geolocation! Please check the search term again...', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to search the geolocation! Please check the search term again...', undefined)
        } else {
            const geocodeData = response.body.features[0]
            callback(undefined, {
                latitude: geocodeData.center[1],
                longitude: geocodeData.center[0],
                location: geocodeData.place_name
            })
        }
    })
}

module.exports = geocode