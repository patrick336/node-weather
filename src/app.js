const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup staic directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This helpText',
        title: 'Help Page',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        
            if(error) {
                // return console.log(error)
                return res.send({ error })
            } 
        
            forecast(latitude, longitude, (error, forecastData) => {
        
                if(error) {
                    // return console.log(error)
                    return res.send({ error })
                } 

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
    });


 


    // if(!address) {
    //     console.log("Please provide an address");
    // } else {
    //     geocode(address, (error, {latitude, longitude, location}) => {
        
    //         if(error) {
    //             return console.log(error)
    //         } 
        
    //         forecast(latitude, longitude, (error, forecastData) => {
        
    //             if(error) {
    //                 return console.log(error)
    //             } 
        
    //             console.log(location);
    //             console.log(forecastData);
    //         })
    //     });
    // }


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        info: 'Help article not found.',
        name: 'Andrew Mead'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        info: 'Page not found.',
        name: 'Andrew Mead'
    })
})

app.listen(3000,  () => {
    console.log('Server is up on port 3000.')
})