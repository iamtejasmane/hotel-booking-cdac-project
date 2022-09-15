module.exports = (sequelize , type)=>{
    return sequelize.define('property_type',{
        id:{
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : type.STRING
        
    })
}