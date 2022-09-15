const express = require('express');
const { User } = require('../../sequelize')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const utils = require('../../utils')

const crypto = require('crypto-js')
const router = express.Router()

router.post('/signup',(req, res)=>{
    const {firstName, lastName, email , password , user_type} = req.body
    const encryptedPassword = crypto.SHA256(password) + ""
    return User.create({
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : encryptedPassword,
        user_type : user_type
    }).then((user) => {
        res.send(utils.createResult(null, user))
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })
})

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

router.put('/:id',(req, res)=>{
    User.findByPk(req.params.id).then((user)=>{
        user.update(req.body)
    }).then((user) => {
        res.send(utils.createResult(null, user))
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