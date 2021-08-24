// Config Express
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, function() {
    console.log('The server is running, ' +
        ' please, open your browser at http://localhost:%s/users', 
        port);
  });
//config env
require("dotenv").config({ path: "./config/.env" });
// Connect DB 
const mongoose= require('mongoose');
    mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,

      },
      (err) => {
        if (err) {
          console.log(err);
        } else console.log("database connected");
      }
    );

    /* require user model*/
const User = require("./models/user");
app.use(express.json())

/*Create users*/
 User.create([{lastName:"KADHI",firstName:"Seifeddine",emailAddress:"kadhi.seifeddine@gmail.com",phoneNumber:26825447},{lastName:"xxxxxxx",firstName:"yyyyyyy",emailAddress:"xxxxyyyyyy@gmail.com",phoneNumber:45819321921}]) 
  /*get users*/
 app.get("/users", (req, res) =>
  User.find()
    .then((el) => res.json(el))
    .catch((err) => console.log(err))
);
  /*add user*/
  app.post("/add_user", (req, res) => {

    let newUser = new User(req.body);
    newUser
      .save()
      .then(() => res.json({ msg: "User added " }))
      .catch((err) => console.log(err));
  });

 /* edit user by id*/
 app.put('/edit_user/:id',(req,res)=>{
  User.findByIdAndUpdate(req.params.id,{ $set:req.body},{new:true})
  .then((el)=>res.json(el)).catch((err)=>console.log(err))
}
)

/* delete user by id*/
app.delete('/delete_user/:id',(req,res)=>{

  User.deleteOne({_id:req.params.id})
  .then((el)=>res.json(el)).catch((err)=>console.log(err))

})