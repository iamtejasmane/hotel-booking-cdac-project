module.exports = (sequelize , type)=>{
    return sequelize.define('cities',{
        id:{
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        state_id : type.INTEGER,
        name : type.STRING,
        code : type.STRING
    })
}