const mongoose=require('mongoose')
const cron = require('node-cron');
const newscontroller =require('../controllers/newscontroller');
const newsModel = require('../models/news');

const connectDb=async(MONGO_URI)=>{
    try{
      await mongoose.connect(MONGO_URI)
      console.log('connected')
      cron.schedule('0 0 * * *', async()=>{
        newscontroller.api()  
      })
    

    }catch(error){
        console.log(error)
    }
}

module.exports=connectDb