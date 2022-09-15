const express = require('express')
const { User } = require('../../sequelize')

const utils = require('../../utils')

const router = express.Router()

router.get('/',(req, res)=>{
    User.findAll().then((users) => {
        res.send(utils.createResult(null, users))
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })
})

router.delete('/:id',(req, res)=>{
    User.findByPk(req.params.id).then((user)=>{
        user.destroy()
    }).then((user) => {
        res.send(utils.createResult(null, user))
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })
})

module.exports = router
