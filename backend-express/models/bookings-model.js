module.exports = (sequelize , type)=>{
    return sequelize.define('bookings',{
        id:{
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        property_id : type.INTEGER,
        user_id : type.INTEGER,
        check_in_date : type.DATE,
        check_out_date : type.DATE,
        price_per_day : type.DECIMAL,
        tax_paid : type.DECIMAL,
        amount_paid : type.DECIMAL,
        cancel_date : type.DATE,
        booking_date : type.DATE,
        is_refund : {
            type : type.BOOLEAN,
            defaultValue : 1
        },
        status : {  //status 1: Booked , 2: Canceled
            type : type.INTEGER,
            defaultValue : 1
        } 
    })
}
//this is test line