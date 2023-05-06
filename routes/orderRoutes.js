
const express = require("express");
const { orderModel } = require("../models/orderModel");
const orderRouter = express.Router()
const jwt = require("jsonwebtoken")


orderRouter.post('/order', async (req, res) => {

    const token = req.headers.token

    try {
      const { books,totalAmount } = req.body;
     

       const decode=jwt.verify(token,"msi")

       const order = new orderModel({user:decode.userId,books,totalAmount})


    // const order = new orderModel({
    //     user: decode.userId,
    //     books: books.map(book => mongoose.Types.ObjectId(book)),
    //     totalPrice: totalPrice
    //   });
       await order.save()
       res.status(201).send({msg:"order place successfully"})
    // res.send(typeof(books))
  

    } catch (error) {
      console.error(error);
      res.status(400).json({ msg: error });
    }
  });
  

    orderRouter.get('/orders',async(req,res)=>{

    

    const orders=await orderModel.find()

    res.status(200).send(orders)

})

orderRouter.delete("/order/:id",async(req,res)=>{
    try{
        const {id}=req.params;



 
            const book = await orderModel.findByIdAndDelete({_id:id})
   
            res.status(202).send({msg:"book is delete from database"})

    
   }
   catch(error)
   {
    res.status(400).send({err:`the error is: ${error}`})
   }        
    
})


  module.exports={orderRouter}