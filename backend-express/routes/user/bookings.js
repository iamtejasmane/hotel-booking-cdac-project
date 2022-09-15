const express = require('express')
const {Bookings, User} = require('../../sequelize')
const utils = require('../../utils')
const mailer = require('../../mailer')
const pug =  require('pug');

const compiledFunctionConfirm = pug.compileFile('template/confirmBooking.pug')
const compiledFunctionCancel = pug.compileFile('template/cancelBooking.pug')

const router = express.Router()


router.get('/',(req,res)=>{
    Bookings.findAll({where : {user_id : req.id }}).then((bookings) => {
        res.send(utils.createResult(null, bookings))
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})

router.post('/book', (req, res)=>{
    const { propertyId, checkInDate , checkOutDate, amount, bookingDate } = req.body
        console.log(req.id)
    Bookings.create({
        property_id : propertyId,
        user_id : req.id,
        check_in_date : checkInDate,
        check_out_date : checkOutDate, 
        amount_paid : amount,
        booking_date : bookingDate
    }).then((booking) => {
        const body = compiledFunctionConfirm({
            checkInDate : checkInDate,
            checkOutDate : checkOutDate,
            price : amount
        })
        const subject = `Your Booking has been comfirmed.`
        let email;  
        User.findOne({where : {id : req.id}}).then((user) => {

            console.log('inner ', user['dataValues']['email'])
            email = user['dataValues']['email']
        }).then(()=>{
            console.log( 'outer email object', email)

            mailer.sendEmail(email , subject , body , ()=>{
                res.send(utils.createResult(null, booking))
            })
        })
        
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})


router.put('/cancel/:id', (req, res)=>{
    const { cancelDate, userId } = req.body
    Bookings.findByPk(req.params.id).then((property) => {
        property.update({
            cancel_date : cancelDate,
            is_refund : true,
            status : 2
        })
    }).then((booking) => {
        const body = compiledFunctionCancel({
            price : amount
        })
        const subject = `Your Booking has been Canceled.`
        const email = User.findOne({where : {id : userId}}).then((user) => {
            return user['email']
        })
        mailer.sendEmail(email , subject , body , ()=>{
            res.send(utils.createResult(null, booking))
        })
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})

module.exports = router