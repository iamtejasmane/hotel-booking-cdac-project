const Sequelize = require('sequelize')

const userModel = require('./models/user-model')
const stateModel = require('./models/states-model')
const cityModel = require('./models/citites-model')
const bookingsModel = require('./models/bookings-model')
const propertyImageModel = require('./models/property-image-model')
const roomTypeModel = require('./models/room-type-model')
const amenitiesModel = require('./models/amenities-model')
const propertyTypeModel = require('./models/property-type-model')
const propertyReviewsModel = require('./models/property-reviews-model')
const propertiesModel = require('./models/properties-model')

const sequelize = new Sequelize('project','root','manager',{
    host : 'localhost',
    dialect : 'mysql',
    pool:{
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000 
    }
})
sequelize.options.logging = false

sequelize.authenticate().then(()=>{
    console.log('Connection established successfully')
}).catch((error)=>{
    console.log('error ' + error)
})

const User = userModel(sequelize, Sequelize)
const State = stateModel(sequelize, Sequelize)
const City = cityModel(sequelize,Sequelize)
const Amenities = amenitiesModel(sequelize,Sequelize)
const RoomType = roomTypeModel(sequelize,Sequelize)
const PropertyImages = propertyImageModel(sequelize,Sequelize)
const PropertyReviews = propertyReviewsModel(sequelize,Sequelize)
const PropertyType = propertyTypeModel(sequelize, Sequelize)
const Bookings = bookingsModel(sequelize,Sequelize)
const Property = propertiesModel(sequelize, Sequelize)



Property.belongsTo(RoomType,{foreignKey : 'room_type_id', targetKey : 'id'})
Property.belongsTo(PropertyType,{foreignKey : 'property_type_id'})
Property.belongsTo(User, {foreignKey : 'user_id'})
Property.belongsTo(State, {foreignKey : 'state_id'})
Property.belongsTo(City, {foreignKey : 'city_id'})

Amenities.belongsTo(Property , {foreignKey : 'property_id', targetKey : 'id'})
State.hasMany(City,{foreignKey: 'state_id', sourceKey: 'id'})

PropertyReviews.belongsTo(Property, {foreignKey: 'property_id', targetKey : 'id'})
PropertyReviews.belongsTo(User, {foreignKey: 'user_id', targetKey : 'id'})
PropertyReviews.belongsTo(Bookings, {foreignKey: 'booking_id', targetKey : 'id'})


Bookings.belongsTo(Property,{foreignKey : 'property_id', targetKey : 'id'})
Bookings.belongsTo(User,{foreignKey : 'user_id', targetKey : 'id'})

PropertyImages.belongsTo(Property, {foreignKey : 'property_id', targetKey : 'id'})
PropertyImages.belongsTo(User,{foreignKey : 'user_id', targetKey : 'id'})


sequelize.sync({force : false}).then(()=>{
    console.log('Database synched')
})

module.exports = {
    User : User,
    State : State,
    City : City,
    State : State,
    RoomType : RoomType,
    PropertyType : PropertyType,
    Bookings : Bookings,
    Amenities : Amenities,
    PropertyImages : PropertyImages,
    PropertyReviews : PropertyReviews,
    Property : Property
}