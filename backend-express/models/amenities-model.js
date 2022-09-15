module.exports = (sequelize , type)=>{
    return sequelize.define('amenities',{
        id:{
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        property_id : type.INTEGER,
        name : type.STRING(100),
        status : {
            type : type.BOOLEAN,
            defaultValue : false
        }
    })
}