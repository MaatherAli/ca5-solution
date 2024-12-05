import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";

import bcrypt from "bcrypt";
import PostModel from "./Models/PostModel.js";
import  dotenv  from "dotenv";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//Database connection
const connectString =`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@postitcluster.hxx4l.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=PostITCluster`;

 

mongoose.connect(connectString);
app.listen(process.env.PORT, () => {
  console.log("You are connected");
});
app.post("/savepost", async (req, res)=>{
  try{
    const post = new PostModel({
       postMsg:req.body.postMsg,
       email:req.body.email
    });
    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/registerUser", async(req, res) => {
  try{
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    await user.save();
    res.send({user:user, msg:"Document saved successfully"})

  }
  catch(error) {
    console.error(error);
    res.status(500).json({error:"An unexpected error occurred"})

  }


})

//Express route for login

app.post("/login", async (req, res) => { 
  try { 
    const { email, password } = req.body;
  
    const user = await UserModel.findOne({ email: email });

    if (!user) { 
      res.status(500).send({ msg: " Couldn't find the user" });
      
    }
    else if (user.password !== password) {
      res.status(500).json({ msg: "Password is incorrect" });
      
    }
    else {
      res.send({user: user,msg:"Authentication is  successfull"})
    }
  }
  catch (error) { 
    res.status(500).json({error:"An unexpected error occurred"})
  }
})

app.post("/logout", async (req, res) => {
  res.send({ msg: "logout successful" })
 })