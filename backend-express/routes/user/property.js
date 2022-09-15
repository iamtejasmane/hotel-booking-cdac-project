const express = require('express')
const {Property} = require('../../sequelize')
const utils = require('../../utils')

const router = express.Router()

router.get('/:id',(req, res)=>{
    Property.findAll({where : {user_id : req.params.id }}).then((property) => {
        res.send(utils.createResult(null, property))
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})
router.get('/city/:id',(req, res)=>{
    Property.findAll({where : {city_id : req.params.id }}).then((property) => {
        res.send(utils.createResult(null, property))
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})

router.post('/', (req, res)=>{
    const {name , description ,  property_type_id ,  room_type_id ,  state_id ,  city_id , address , latitude, longitude
    ,  bedroom_count,  bed_count , bathroom_count ,  start_date ,  end_date, price } = req.body
        console.log(req.body)
        console.log(req.id);
    Property.create({
        name : name,
        description : description,
        property_type_id : property_type_id,
        user_id : req.id,
        room_type_id : room_type_id,
        state_id :state_id,
        city_id :city_id,
        address : address,
        latitude : latitude,
        longitude : longitude,
        bedroom_count : bedroom_count,
        bed_count : bed_count,
        bathroom_count : bathroom_count,
        start_date : start_date,
        end_date : end_date, 
        price : price
    }).then((property) => {
        res.send(utils.createResult(null, property))
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})

router.put('/:id', (req, res)=>{
    const { bedroomCount, bedCount , bathroomCount } = req.body
    Property.findByPk(req.params.id).then((property) => {
        property.update({
            bedroom_count : bedroomCount,
            bed_count : bedCount,
            bathroom_count : bathroomCount
        })
    }).then((property) => {
        res.send(utils.createResult(null, property))
    }).catch((err)=>{
        res.send(utils.createResult(err, null))
    })
})

router.delete('/:id',(req, res)=>{
    Property.findByPk(req.params.id).then((property)=>{
        property.destroy()
    }).then((property) => {
        res.send(utils.createResult(null, property))
    }).catch((err) =>{
        res.send(utils.createResult(err, null))
    })
})

module.exports = router