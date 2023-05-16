let mongoose = require('mongoose');
let dbConnect = require('./dbConnect');
dbConnect();  //for creating connection between mongoose and node.js

let productSchema = mongoose.Schema({
    imglink: {
        type: String
    },
    name: {
        type: String
    },
    brand:{
        type: String
    },
    price:{
        type: Number
    },
    cat:{
        type: String
    }
});

module.exports = productSchema;