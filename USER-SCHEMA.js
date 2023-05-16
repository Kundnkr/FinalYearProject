let mongoose = require('mongoose');
let dbConnect = require('./dbConnect');
dbConnect();

const USER_SCHEMA = new mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    confirmPassword: {
        typr: String
       
    },
    cart: []
});

module.exports = USER_SCHEMA;