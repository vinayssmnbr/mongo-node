const mongoose=require('mongoose')
const Schema=mongoose.Schema
const newsSchema=new Schema({
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: Date
});
const newsModel=mongoose.model('News',newsSchema)
module.exports=newsModel