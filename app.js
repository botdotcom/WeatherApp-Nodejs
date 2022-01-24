const request = require('request')
const chalk = require('chalk')
const geocode = require('./service/geocode')
const forecast = require('./service/forecast')

// API requests
geocode('Newark', (error, {latitude, longitude, location}) => {
    if (error) {
        return console.log(chalk.red.inverse('Cannot complete geolocation request! Please try again later...'))
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return console.log(chalk.red.inverse('Cannot complete weather request! Please try again later...'))
        }

        console.log(chalk.green(location))
        console.log(forecastData)
    })
})