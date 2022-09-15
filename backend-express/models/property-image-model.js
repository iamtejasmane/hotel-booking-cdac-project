module.exports = (sequelize , type)=>{
    return sequelize.define('property_image',{
        id:{
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        property_id : type.INTEGER,
        user_id : type.INTEGER,
        image : type.STRING
    })
}