const express = require('express')
const { PropertyType } = require('../../sequelize')
const utils = require('../../utils')
const router = express.Router()

router.get('/', (req, res) =>{
    PropertyType.findAll().then((propertyType) => {
       res.send(utils.createResult(null, propertyType)) 
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })
})


router.post('/', (req, res)=>{
    const {name} = req.body
    PropertyType.create({ name : name}).then((propertyType) => {
        res.send(utils.createResult(null, propertyType))
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })
})


router.put('/:id', (req,res) => {
    PropertyType.findByPk(req.params.id).then((propertyType)=>{
        propertyType.update(req.body)
    }).then(propertyType=>{
        res.send(utils.createResult(null, propertyType))
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})

router.delete('/:id', (req, res)=>{
    PropertyType.findByPk(req.params.id).then(propertyType=>{
        propertyType.destroy()
    }).then(propertyType=>{
        res.send(utils.createResult(null, propertyType))
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})

module.exports = router

