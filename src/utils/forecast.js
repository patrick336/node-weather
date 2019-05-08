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
            const {summary, temperature, precipProbability} = body.currently
            const {temperatureLow, temperatureHigh} = body.daily.data[0]

            callback(undefined, `${summary}. It is currently ${temperature} degress out. There is a ${precipProbability}%  chance of rain. Low-temperature is ${temperatureLow} and high-temperature is ${temperatureHigh}`)
        }
    })
}

module.exports = forecast