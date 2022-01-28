const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./service/geocode')
const forecast = require('./service/forecast')

const app = express()
const port = process.env.PORT || 3000

// directory paths
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

// setup static/assets
app.use(express.static(publicDirPath))

// setup template engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)

// setup path for header and footer
hbs.registerPartials(partialsDirPath)

// routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shamli Singh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    // weather API requests with callback chaining
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location
            })
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        name: 'Shamli Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Shamli Singh'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shamli Singh',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shamli Singh',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})