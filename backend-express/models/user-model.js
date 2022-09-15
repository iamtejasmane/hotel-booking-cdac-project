module.exports = (sequelize , type)=>{
    return sequelize.define('users',{
        id:{
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        firstName : type.STRING,
        lastName : type.STRING,
        email : type.STRING,
        password : type.STRING,
        user_type : { // 1 : Admin , 2 : User(Customer , PropertyOwner)
            type : type.TINYINT,
            defaultValue : 2
        }
    })
}