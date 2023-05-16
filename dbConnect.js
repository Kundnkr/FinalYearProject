let mongoose  = require('mongoose');
let url = "mongodb+srv://kundan:kundan501@cluster0.kl8xdw3.mongodb.net/FinalyearProject"



let dbConnect = async()=>{
   await mongoose.connect(url);
   console.log("database connected");
}

module.exports = dbConnect;







