const express = require('express')
const {Property} = require('../../sequelize')
const utils = require('../../utils')

const router = express.Router()

router.get('/',(req, res)=>{
    Property.findAll().then((properties) => {
        res.send(utils.createResult(null, properties))
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})

module.exports = router