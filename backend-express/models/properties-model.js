module.exports = (sequelize , type)=>{
    return sequelize.define('properties',{
        id:{
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : type.STRING,
        description : type.STRING,
        property_type_id : type.INTEGER,
        user_id : type.INTEGER,
        room_type_id : type.INTEGER,
        state_id : type.INTEGER,
        city_id : type.INTEGER,
        address : type.TEXT,
        latitude : type.STRING,
        longitude : type.STRING,
        bedroom_count : type.STRING,
        bed_count : type.STRING,
        bathroom_count : type.STRING,
        start_date : type.DATE,
        end_date : type.DATE,
        price : type.DECIMAL(10),
        status : {  //status 1: Available , 2: Booked, 3: Saved 
            type : type.INTEGER,
            defaultValue : 1
        } 
    })
}

