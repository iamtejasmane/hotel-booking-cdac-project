const express = require('express');
const { User } = require('../../sequelize')
const jwt = require('jsonwebtoken')
const config = require('../../config')

const crypto = require('crypto-js')
const router = express.Router()

router.post('/signin',(req, res)=>{
    const {email, password} = req.body
    const encryptedPassword = crypto.SHA256(password) + ""
    const result = {}
    return User.findOne({where : {email : email, password: encryptedPassword}}).then(user=>{
        const token = jwt.sign({id : user['id']}, config.secret)
        result['status'] = 'success'
        result['data'] = {
            firstName : user['firstName'],
            lastName : user['lastName'],
            token : token
        }
        res.json(result)
    }).catch(err =>{
        result['status'] = 'error'
        result['data'] = err
        res.send(result)
    })
})

module.exports = router