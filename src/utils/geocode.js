const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiYWtzc2hheWt1bWFyIiwiYSI6ImNrcm9mdjc0ZjJhZnEydm81NjR5ODN2OXYifQ.lQtSlGtu1s5dsDm1-x2HnA&limit=1'
    request ({url,json:true},(error,{body } = {}) =>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if (body.features.length ===0){
            callback('Unable to find the location!',undefined)
        }else {
            callback(undefined,{
             latitude : body.features[0].center[1],
             longitude : body.features[0].center[0],
             location : body.features[0].place_name
            })
        }
    })
}  

module.exports = geocode