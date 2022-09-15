module.exports = (sequelize , type)=>{
    return sequelize.define('property_reviews',{
        id:{
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        property_id : type.INTEGER,
        user_id : type.INTEGER,
        booking_id : type.INTEGER,
        comment : type.TEXT,
        rating : type.INTEGER

    })
}