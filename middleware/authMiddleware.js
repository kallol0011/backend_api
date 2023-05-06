
const jwt = require ("jsonwebtoken")

const authorization = (req,res,next)=>{

 const token = req.headers.token

 if(token)
 {

    const decode = jwt.verify(token,"msi")
    
    if(decode)
    {
        console.log(decode)
        req.body.userId=decode.userId
        req.body.admin=decode.admin
        next()
    }
    else
    {
        res.status(400).send({"msg":"you have to login first"})
    }
 
 }
 else
 {
    res.status(400).send({"msg":"you have to login first"})

 }


}



module.exports={
   authorization
}