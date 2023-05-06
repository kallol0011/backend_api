
const express = require ("express")
const { userRouter } = require ("./routes/userRouter")
require("dotenv").config()
const {connection} = require ("./db")
const { authorization } = require("./middleware/authMiddleware")
const { bookRouter } = require("./routes/bookRoutes")

const cors = require ("cors")
const { orderRouter } = require("./routes/orderRoutes")
const app= express()



app.use(express.json())
app.use(cors())

app.use("/api",userRouter)
app.use(authorization)
app.use("/api",bookRouter)
app.use("/api",orderRouter)

app.get("/",(req,res)=>{
    res.send("working")
})


const port = process.env.PORT || 8000

app.listen(port,async()=>{
   try
   {
     await connection
   console.log("connect to database")

   }
   catch(error)
   {
    console.log(error)
   }
   console.log(`server is running on ${port} `)
})