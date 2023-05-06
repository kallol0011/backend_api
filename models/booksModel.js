

  
const mongoose = require ("mongoose")

const booksSchema=mongoose.Schema({
    title : String,
    author: String,
    category: String,
  
    
    price: Number,
    quantity: Number

})

const bookModel=mongoose.model("books",booksSchema)

module.exports={
    bookModel
}
