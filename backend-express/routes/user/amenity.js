const express = require('express')
const { Amenities } = require('../../sequelize')
const utils = require('../../utils')

const router = express.Router()

router.get('/:id',(req,res) =>{
    const propertyId = req.params.id
    Amenities.findAll({where : {property_id : propertyId }}).then((amenities) =>{
        res.send(utils.createResult(null, amenities)) 
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })      
})

router.post('/:id',(req,res) => {
    const { name , status} = req.body
    Amenities.create({
        property_id : req.params.id,
        name : name,
        status : status
    }).then((amenities) =>{
        res.send(utils.createResult(null, amenities)) 
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })     
})

module.exports = router