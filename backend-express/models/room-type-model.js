module.exports = (sequelize , type)=>{
    return sequelize.define('room_type',{
        id:{
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : type.STRING
        
    })
}