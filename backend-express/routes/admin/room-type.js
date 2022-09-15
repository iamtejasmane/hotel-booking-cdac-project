const express = require('express')
const {RoomType} = require('../../sequelize')
const utils = require('../../utils')
const router = express.Router()

router.get('/', (req, res) =>{
    RoomType.findAll().then((roomType) => {
       res.send(utils.createResult(null, roomType)) 
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })
})

router.post('/', (req, res)=>{
    RoomType.create(req.body).then((roomType) => {
        res.send(utils.createResult(null, roomType))
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })
})

router.put('/:id', (req,res) => {
    RoomType.findByPk(req.params.id).then((roomType)=>{
        roomType.update(req.body)
    }).then(roomType=>{
        res.send(utils.createResult(null, roomType))
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})

router.delete('/:id', (req, res)=>{
    RoomType.findByPk(req.params.id).then(roomType=>{
        roomType.destroy()
    }).then(roomType=>{
        res.send(utils.createResult(null, roomType))
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})

module.exports = router

