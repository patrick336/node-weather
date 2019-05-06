const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/0337ca2e06a0e176f87e3d6c6e15b76d/${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {

            const {latitude, longitude, timezone} = body
            const {summary, temperature} = body.currently
            
            // console.log('latitude', latitude)
            // console.log('longitude', longitude)
            // console.log('summary', summary)
            // console.log('temperature', temperature)
            // console.log('timezone', timezone)

            callback(undefined, {
                latitude,
                longitude,
                summary,
                temperature,
                timezone
            })
        }
    })
}

module.exports = forecast