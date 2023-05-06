const express = require("express")

const userRouter = express.Router()

const jwt = require ("jsonwebtoken")
const bcrypt = require ("bcrypt")

const { UserModel } = require ("../models/userModel")


userRouter.post("/register",async(req,res)=>{

    const {email,name,password,isAdmin }=req.body;
    try{

        let user = await UserModel.findOne({ email });
        // res.send(req.body)
        if (user) {
        return res.status(400).json({ msg: 'User already exists' });
        }

         else
         {
            bcrypt.hash(password,5,async(err,hash)=>{
                const user = new UserModel({name,email,password:hash,isAdmin})
                await user.save()
                res.status(200).send({msg:"register successful",user})
             })
         }
        
    }
    catch(error)
    {
        res.status(400).send({msg:error})
    }

})

userRouter.post("/login",async(req,res)=>{

    const {email,password}=req.body
    try
    {
        const user = await UserModel.findOne({email})
        console.log("found",user);
        if(user)
        {
            console.log(user)
            bcrypt.compare(password,user.password,(err,result)=>{
               if(result)
               {
                res.status(200).send({msg:"login successful","token":jwt.sign({"userId":user._id,"admin":user.isAdmin},"msi")})
               }
               else
               {
                res.status(400).send({msg:"wrong password"})
               }
            })
        }
    }
    catch(error)
    {
        res.status(400).send({"msg":error})
    }

})
 
module.exports={
    userRouter
}

// {
//     "name":"example",
//   "email":"example@example.com",
//   "password":"1234567",
//   "is_Admin":false
//   }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2MDc3MzY0NzYxMTE5MGQ2OWE0YjAiLCJpYXQiOjE2ODMzNjAwNjB9.TBSt3o8ex9I5_40cYugEAutiZBhHirdz50lDip3kxQk