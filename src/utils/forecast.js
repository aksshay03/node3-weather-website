const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=235b5c03a1a2b9d85095f851382aed69&query= ' + latitude + ',' + longitude + '&units=f'
    request ({url,json:true},(error,{body} = {}) =>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if (body.error){
            callback('Unable to find the location!',undefined)
        }else {
            callback(undefined,
                body.current.weather_descriptions + ' It is currently ' + body.current.temperature +' degrees out. But it feels like ' + body.current.feelslike+ ' degrees out' 
            )
        }
    })
}  

module.exports = forecast
