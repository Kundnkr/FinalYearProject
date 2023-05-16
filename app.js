let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
let ejs = require('ejs');
const md5 = require("md5");
let app = express();
app.set('view engine','ejs');
let productSchema = require('./productSchema');
const userSchema = require('./USER-SCHEMA');
const autoprefixer = require('autoprefixer');
const USER = mongoose.model('User',userSchema);
let product = mongoose.model('Product', productSchema);
let currentPath = path.join(__dirname, 'views');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));


let login =false;
let loginid = "";
let auth = false;

app.get('/', async(req,res)=>{
    console.log("home");
    let datas = await product.find();
    res.render('index',{data:datas, login:login, auth:auth});
});

app.get('/product',(req,res)=>{
    res.sendFile(currentPath + '/addproduct.html');
});

app.get('/view/:id', async(req,res)=>{
    let result = await product.findOne({ _id: req.params.id });
    res.render('product', { element: result,login:login, auth:auth})
});

app.get('/logout', (req,res)=>{
    auth = false;
    login = false;
    res.redirect('/');
})

app.post('/add-product', async(req,res)=>{
    let details = req.body;
    let data = await product(details);
    let result = await data.save();
    console.log(result.cat, "product added successfully");
    res.redirect('/product');
});

app.get('/register', (req, res) => {
    res.render('register', {login:login, auth:auth});
})
 

app.post("/register", async(req,res)=> {
    try {
        const tempUser = new USER({
            email: req.body.newEmail,
            name: req.body.newName,
            password: md5(req.body.newPassword),
            confirmPassword: md5(req.body.newConfirmPassword),
        });
        if(req.body.newPassword == req.body.newConfirmPassword) {
            await tempUser.save();
            console.log("Registration successful");
            res.redirect('/');
        }
        else {
            console.log("The password doesn't match with confirm password.");
            res.render("register");
        }
    }
    catch(error) {
        console.log(error);
        res.send(error);
    }
});


app.get('/login', (req,res)=>{
    res.render("login", {login:login, auth:auth});
})

app.post('/login', async (req, res)=>{
    
    try {
        const foundUser = await USER.findOne({email: req.body.userEmail, password: md5(req.body.userPassword)});
        if(!foundUser) {
            alert("User not found");
        }
        else {
            auth = true;
            login = true;
            loginid = foundUser.id;
            console.log(loginid);
            res.redirect('/');
        }
    }
    catch(error) {
        res.send(error.message);
    }
})
app.listen('3000', ()=>{
    console.log("Server is running on " + "3000");
});