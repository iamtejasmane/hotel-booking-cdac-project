const express = require('express')
const { PropertyReview } = require('../../sequelize')
const utils = require('../../utils')

const router = express.Router()


router.get('/:id',(req,res) =>{
    const propertyId = req.params.id
    PropertyReview.findOne({where : {property_id : propertyId }}).then((reviews) =>{
        res.send(utils.createResult(null, reviews)) 
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })      
})

router.post('/:id',(req,res) => {
    const { user_id , booking_id, comment , rating} = req.body
    PropertyReview.create({
        property_id : req.params.id,
        user_id : user_id,
        booking_id :booking_id,
        comment : comment,
        rating : rating
    }).then((review) =>{
        res.send(utils.createResult(null, review)) 
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })     
})

module.exports = router