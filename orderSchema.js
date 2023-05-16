let mongoose = require('mongoose');
let dbConnect = require('./dbConnect');
dbConnect();

const ORDER_SCHEMA = new mongoose.Schema({
    address: {
        type: String
    },
    pinCode: {
        type: Number
    },
    productName: {
        type: String
    },
    price: {
        type:Number
       
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    
});

module.exports = ORDER_SCHEMA;