const request = require('request')
const fs = require('fs')

const secret = JSON.parse(fs.readFileSync('./secret.json'))

const forecast = (latitude, longitude, callback) => {
    // weather API request
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=' + secret.weatherstack_key + '&query=' + latitude + ',' + longitude

    request({url: weatherUrl, json: true}, (error, response) => {
        if (error) {
            callback('Cannot connect to the weather API! Please try again later...', undefined)
        } else if (response.body.error) {
            callback('Unable to find location! Please check the search term again...', undefined)
        } else {
            const weatherData = response.body.current
            callback(undefined, 'The current temperature is ' + weatherData.temperature + ' °C. It feels like ' + weatherData.feelslike + ' °C.')
        }
    })
}

module.exports = forecast