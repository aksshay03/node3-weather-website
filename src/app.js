const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = express()
const addresstoPublicDirectory = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)
app.use(express.static(addresstoPublicDirectory))



app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Aksshay'
    })

})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About',
        name:'Aksshay'
    })

})

app.get('/help',(req,res) =>{
    res.render('help',{
        helptext:'This is someusefull text',
        title:'Need Help?',
        name:'Aksshay'
    })

})
app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
          error: "Address must be provided!"
        })
    }

    geocode(req.query.address,(error,{ latitude,longitude,location} = {})=>{
        if(error){
            return res.send ({ error });
        }
    
        forecast(latitude,longitude,(error,Forecastdata)=>{
            if(error){
                return res.send ({ error });
            }
            res.send({
                forecast:Forecastdata,
                location,
                address:req.query.address
             })
        })
})
})
app.get('/help/*',(req,res) =>{
    res.render('helpwildcard',{
        title:'404',
        name:'Aksshay',
        errormessage:'Help article not found'
    })
})
app.get('*',(req,res) =>{
    res.render('404page',{
        title:'404',
        name:'Aksshay',
        errormessage:'Page Not Found'
    })
})
app.listen(port, () =>{
    console.log('Server is up on port '+ port)
})