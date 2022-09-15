const express = require('express')
const { PropertyImages } = require('../../sequelize')
const utils = require('../../utils')
const fs = require('fs')
const multer = require('multer')
const upload = multer({dest : 'images/'})


const router = express.Router()


router.get('/image/:filename',(req,res) =>{
    const propertyId = req.params.id
    PropertyImages.findOne({where : {property_id : propertyId }}).then((reviews) =>{
        res.send(utils.createResult(null, reviews)) 
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })      
})

router.get('/image/:id',(req,res) =>{
    const propertyId = req.params.id
    const {userId} = req.body
    PropertyImages.findAll({where : {property_id : propertyId, user_id : userId }}).then((images) =>{
        res.send(utils.createResult(null, images)) 
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })      
})

router.post('/image/:filename', upload.single('photo') ,(req,res) => {
    const filename = req.params.filename
    const { property_id } = req.body
    PropertyImages.create({
        property_id : property_id,
        user_id : req.id,
        image : filename
    }).then((image) =>{
        res.send(utils.createResult(null, image)) 
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })     
})

module.exports = router