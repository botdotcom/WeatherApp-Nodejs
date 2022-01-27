const express = require('express')
const geocode = require('./service/geocode')
const forecast = require('./service/forecast')

const app = express()

// routes
app.get('/', (req, res) => {
    res.send('Hello Express.js!')
})

app.get('/weather', (req, res) => {
    res.send('Hello Express.js! This is the weather page')
})

app.get('/help', (req, res) => {
    res.send('Hello Express.js! This is the help page')
})

app.get('/about', (req, res) => {
    res.send('Hello Express.js! This is the about page')
})

app.listen(3000, () => {
    console.log('Server is up and running...')
})

// API requests with callback chaining
// geocode('Newark', (error, {latitude, longitude, location}) => {
//     if (error) {
//         return console.log(chalk.red.inverse('Cannot complete geolocation request! Please try again later...'))
//     }

//     forecast(latitude, longitude, (error, forecastData) => {
//         if (error) {
//             return console.log(chalk.red.inverse('Cannot complete weather request! Please try again later...'))
//         }

//         console.log(chalk.green(location))
//         console.log(forecastData)
//     })
// })