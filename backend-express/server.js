const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const utils = require('./utils')
const config = require('./config')


// User routes

const routeUser = require('./routes/user/user')
const routeAmenities = require('./routes/user/amenity')
const routePropertyReview = require('./routes/user/property-review')
const routePropertyImage = require('./routes/user/property-image')
const routeProperty = require('./routes/user/property')
const routeBookings = require('./routes/user/bookings')

// Admin routes

const routeAdmin = require('./routes/admin/admin')
const routeAdminUser = require('./routes/admin/users')
const routeState = require('./routes/admin/state')
const routeCity = require('./routes/admin/city')
const routePropertyType = require('./routes/admin/property-type')
const routeRoomType = require('./routes/admin/room-type')
const routeAdminProperty = require('./routes/admin/properties')

const app = express()
app.use(bodyParser.json())
app.use(cors('*'))
app.use(morgan('combined'))

function authorizeUser(req, res, next){
    if((req.url == '/user/signin') ||
        (req.url == '/user/signup') ||
        (req.url == '/admin/signin') ||
        (req.url.startsWith('/user/image'))   
    ){
        next()
    }
    else
    {
        const token = req.headers['token']
        if(!token){
            res.status(401)
            res.send(utils.createResult('token is missing'))
        }else {
            try{
                // console.log(token);
                
                const data = jwt.verify(token, config.secret)
                req.id = data.id
                next()

            }catch(exception){
                res.status(401)
                res.send(utils.createResult('invalid token'))
            }
        }
    }
}

app.use(authorizeUser)

// for Admin 

app.use('/admin', routeAdmin)
app.use('/users',routeAdminUser)
app.use('/property-type', routePropertyType)
app.use('/properties', routeAdminProperty)
app.use('/room-type', routeRoomType)
app.use('/state', routeState)
app.use('/city', routeCity)


// for User

 app.use('/user', routeUser)
 app.use('/property', routeProperty)
 app.use('/amenities', routeAmenities)
 app.use('/property-review', routePropertyReview)
 app.use('/property-image', routePropertyImage)
 app.use('/bookings', routeBookings)

app.listen(4000, '0.0.0.0', ()=> {
    console.log('Server is running on port 4000')
})