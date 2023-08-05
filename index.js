const express= require("express");
const cors = require("cors");
const { Mongoose, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
var bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");


const Type = require("./models/typeModel");
const Material =require("./models/materialModel");
const User_Schema = require ("./models/userModel")
const Mon = require("./models/monModel")
const Order= require("./models/OrderDetailModel")
const auth = require("./auth");
const reveune = require('./models/ReveuneModel')

const app = express();


//MIDDLEWARE
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.options("/update/list_mon", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});
app.use(cors({
  origin: 'http://localhost:3000'|| 'https://fe-drink-pos.vercel.app'
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-reqed-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get('/' ,(req,res) =>{
})

//=============DB connect==============
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

var url ="mongodb+srv://quanghuy161:Tmh5OdLzIzmh9Yup@cluster0.3wcmiob.mongodb.net/";

const databaseConnection = module.exports = () =>{
  try {
    mongoose.connect(
        url,
        options,
    )
    console.log("Database connected successfully ")
  }catch (error){
    console.log(error)
    console.log('Database connection failed')
  }
}
const closeConnection = module.exports = () =>{
  try {
    mongoose.connection.close();
    console.log("Database closed ")
  }catch (error){
    console.log(error)
    console.log('Database closed failed')
  }
}




databaseConnection()

//=======MODELS
const User =mongoose.model("User",User_Schema)
const Donvi = mongoose.model("Donvi",Type)
const Nhomvattu = mongoose.model("Nhomvattu",Type)
const Vattu = mongoose.model("Material",Material)
const Monan = mongoose.model("Mon",Mon)
const OrderDetail = mongoose.model("Order",Order)
const Reveune = mongoose.model("Reveune",reveune)

///===============API================
//=====DONVI
app.get('/donvi' ,(req,res) =>{
  
  res.header("Access-Control-Allow-Origin", "*");
  const donvi = Donvi.find({}).then(items => {
      res.json(items)
  }).then(function(){
    // Success
 }).catch(function(error){
     console.log(error); // Failure
 });
  
})
app.get('/donvi/:_id' ,(req,res) =>{
  
  res.header("Access-Control-Allow-Origin", "*");
  const donvi = Donvi.find({_id: req.params._id}).then(items => {
      res.json(items)
  }).then(function(){
    // Success
  }).catch(function(error){
      console.log(error); // Failure
  });
  
})
app.post('/add_donvi', async (req,res) => {
  
  res.header("Access-Control-Allow-Origin", "*");
  const donvi = new Donvi(req.body);
  donvi.save()
  .then(function(){
    // Success
 }).catch(function(error){
     console.log(error); // Failure
 });
  
}) 
//=====NHOMVATTU
app.get('/nhomvattu' ,(req,res) =>{
  
  res.header("Access-Control-Allow-Origin", "*");
  const nhomvattu = Nhomvattu.find({}).then(items => {
      res.json(items)
  }).then(function(){
    // Success
 }).catch(function(error){
     console.log(error); // Failure
 });
  
})
app.get('/nhomvattu/:_id' ,(req,res) =>{
  
  res.header("Access-Control-Allow-Origin", "*");
  const nhomvattu = Nhomvattu.find({_id: req.params._id}).then(items => {
      res.json(items)
  })
  .then(function(){
    // Success
 }).catch(function(error){
     console.log(error); // Failure
 });
})
app.post('/add_nhomvattu', async (req,res) => {
  
  res.header("Access-Control-Allow-Origin", "*");
  const nhomvattu = new Nhomvattu(req.body);
  nhomvattu.save()
  .then(function(){
    // Success
 }).catch(function(error){
     console.log(error); // Failure
 });
  
}) 
//=====ADD_VATTU
app.post('/add_data', async (req,res) => {
  
  res.header("Access-Control-Allow-Origin", "*");
  const vattu = new Vattu(req.body);
  vattu.save()
  .then(function(){
    // Success
 }).catch(function(error){
     console.log(error); // Failure
 });
  
}) 


app.get('/list_mon',(req,res) =>{
  
  res.header("Access-Control-Allow-Origin", "*");
  const Nguyenlieu = Vattu.find({}).sort({nhomvattu:-1}).then(items => {
      res.json(items)
  }).then(function(){
    // Success
 }).catch(function(error){
     console.log(error); // Failure
 });
  
})

app.get('/list_nguyenlieu',(req,res) =>{
  
  res.header("Access-Control-Allow-Origin", "*");
  const Nguyenlieu = Vattu.find({nhomvattu:{$in:["Nguyên Liệu","Nguyên liệu tổng hợp"]}}).sort({ten:-1}).then(items => {
      res.json(items)
  }).then(function(){
    // Success
 }).catch(function(error){
     console.log(error); // Failure
 });
  
})

app.get('/list_mon/:_id',(req,res) =>{
  
  res.header("Access-Control-Allow-Origin", "*");
  const Nguyenlieu = Vattu.find({_id: req.params._id}).then(items => {
      res.json(items)
  }).then(function(){
     // Success
  }).catch(function(error){
      console.log(error); // Failure
  });
  
})

app.put('/update/list_mon/:_id',(req,res) =>{
  
  res.header("Access-Control-Allow-Origin", "*");
  const reqData= req.body;
  var myQuerry = {_id:req.params._id}
  var newValues = {
    $set:reqData
  }

  Vattu.updateOne(myQuerry,newValues)
  .then((obj) => {
    console.log('Updated - ' + obj);
    res.redirect('orders')
  })
  .catch((err) => {
      console.log('Error: ' + err);
  })
  
})
app.post('/delete/list_mon/:_id',(req,res) =>{
  
  res.header("Access-Control-Allow-Origin", "*");
  var myQuerry = {_id:req.params._id};

  Vattu.deleteOne(myQuerry).then(function(){
    res.send({status:"deleted"}); // Success
  }).catch(function(error){
      console.log(error); // Failure
  });
})



//=========Tạo công thức và món
app.post('/themmon', (req,res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  //console.log(req.body)
  let mon = new Monan(req.body)
  mon.save()
})
app.get('/mon', (req,res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  const mon = Monan.find({}).sort({tenmon:1}).then(items => {
    res.json(items)
}).then(function(){
  // Success
}).catch(function(error){
   console.log(error); // Failure
});
})
app.post('/delete/mon/:_id',(req,res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  var myQuerry = {_id:req.params._id};
  Monan.deleteOne(myQuerry).then(function(){
    res.send({status:"deleted"}); // Success
  }).catch(function(error){
      console.log(error); // Failure
  });
})


//======Chi tiết order
app.post('/add_order_detail', (req,res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  const order = new OrderDetail(req.body)
  order.save()
})

app.post('/reveune_day', (req,res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  const REV = new Reveune(req.body)
  REV.save()
})

app.get("/filter_order/:t",(req,res)  =>{
  res.header("Access-Control-Allow-Origin", "*");
  let space ="_"
  let index = req.params.t.indexOf(space);
   
  let time_start= req.params.t.slice(0,index)
  let time_end= req.params.t.slice(index+1,req.params.t.length)
  const order = OrderDetail.find(
    {
      time:
      {$gte: time_start , $lte:time_end}
    }
    ).sort({time:1}).then(items => {
      res.json(items)
  }).catch(function(error){
      console.log(error); 
  });
})
app.get("/filter_order/day/:t",(req,res)  =>{
  res.header("Access-Control-Allow-Origin", "*");
  let space ="_"
  let index = req.params.t.indexOf(space);
   
  let time_start= req.params.t.slice(0,index)
  let time_end= req.params.t.slice(index+1,req.params.t.length)
  const order = OrderDetail.find(
    {
      time:
      {$gte: time_start , $lt:time_end}
    }
    ).sort({time:1}).then(items => {
      res.json(items)
  }).catch(function(error){
      console.log(error); 
  });
})

//========MENU món và topping
app.get('/menu', (req,res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  const menu = Vattu.find({nhomvattu: {$in:["Món","Topping"]}}).then(items => {
      res.json(items)
  }).then(function(){
     // Success
  }).catch(function(error){
      console.log(error); // Failure
  });

})

//==========login
app.post('/auth/signup', async (req,res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  //hash the password
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        fullname:req.body.fullname,
        password: hashedPassword,
        role:req.body.role
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          res.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
  
})


// login endpoint
app.post("/login", (req, response) => {
  // check if email exists
  User.findOne({ fullname: req.body.fullname })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userFullname: user.fullname,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.send({
            message: "Login Successful",
            fullname: user.fullname,
            role:user.role,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Fullname not found",
        e,
      });
    });
});

// free endpoint
app.get("/free", (req, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth",auth, (req, response) => {
  response.json({ message: "You are authorized to access me" });
});



app.listen (5000, () =>{
    console.log("serer is running on port 5000,http://localhost:5000/")
})