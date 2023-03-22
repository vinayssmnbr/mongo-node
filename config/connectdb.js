const mongoose=require('mongoose')
const connectDb=async(MONGO_URI)=>{
    try{
      await mongoose.connect(MONGO_URI)
      console.log('connected')

    }catch(error){
        console.log(error)
    }
}

module.exports=connectDb