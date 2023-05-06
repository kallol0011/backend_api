
const express = require("express")
const bookRouter = express.Router()

const { bookModel } = require("../models/booksModel")

const jwt = require("jsonwebtoken")


bookRouter.get("/books",async(req,res)=>{

    let data= bookModel.find()
  
    

    if(req.query.category)
    {
        data=data.where({category:req.query.category})
    }

    if(req.query.category&&req.query.author)
    {
        data=data.where({category:req.query.category,author:req.query.author})
    }

 
    try
    {
        const books=await data.exec()
        res.send(books)
   
    }
    catch(error)
    {
        res.send(error)
    }

})


////// get book by id ////

bookRouter.get('/books/:id',async(req,res)=>{

    let id=req.params.id

    const book=await bookModel.findById({_id:id})

    res.status(200).send(book)

})



///////////  add neew book //////////

 bookRouter.post("/books",async(req,res)=>{
 

    const token = req.headers.token

    
    
    
    try
    {
        const decode=jwt.verify(token,"msi")


        console.log(decode)
 
        if(decode.admin===true)
        {
            const book = new bookModel(req.body)
            await book.save()
            res.status(201).send({"msg":"book added"})

        }


    }
    catch(err)
    {
        res.status(400).send({"msg":err})

    }

 })

 
 
 /// patch ///

 bookRouter.patch("/books/:id",async(req,res)=>{
    const token = req.headers.token
    try{
        const {id}=req.params;
    const data=req.body;

    const decode=jwt.verify(token,"msi")


        console.log(decode)

        if(decode.admin===true)
        {
            const book = await bookModel.findByIdAndUpdate({_id:id},data)
           
            res.status(202).send({msg:"book is update in database"})


        }

   }
   catch(error)
   {
    res.status(400).send({err:`the error is: ${error}`})
   }
})


//// delete ////

bookRouter.delete("/books/:id",async(req,res)=>{
    const token = req.headers.token
    try{
        const {id}=req.params;

        const decode=jwt.verify(token,"msi")


        console.log(decode)
 
        if(decode.admin===true)
        {
            const book = await bookModel.findByIdAndDelete({_id:id})
   
            res.status(202).send({msg:"book is delete from database"})
        }

    
   }
   catch(error)
   {
    res.status(400).send({err:`the error is: ${error}`})
   }        
    
})

 module.exports={
    bookRouter
 }