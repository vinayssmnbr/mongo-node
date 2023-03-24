const newsModel=require('../models/news')
const axios=require('axios')
const cron = require('node-cron');

// const apiKey = '9328edd97a4f4c4c9795cda0730607ca';
// const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2023-03-21&to=2023-03-21&sortBy=popularity${searchTerm}&apiKey=${apiKey}`;

const api=async(req,res)=>{
    const searchTerm = req.query.q;
    const apiKey = '9328edd97a4f4c4c9795cda0730607ca';
    const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2023-03-21&to=2023-03-21&sortBy=popularity${searchTerm}&apiKey=${apiKey}`;
    try{
        const response =await axios.get(apiUrl)
        const articles=response.data.articles;

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const news = new newsModel({
              title: article.title,
              description: article.description,
              url: article.url,
              urlToImage: article.urlToImage,
              publishedAt: article.publishedAt,
              source:article.source?.name || 'not available'

            });
        await news.save()
        }
    
            res.json({
                msg:"success"
            });
    }catch(error){
    console.log(error);
    res.status(500).send('error fetching news from API')
    }
}


const getData = (req,res)=>{
    let {searchTerm,source}= req.query;
    // let source=req.query.q

source =source?.split(",")

newsModel.find({ title: { $regex: searchTerm ? searchTerm : "", $options: "i" },source:source?source:{ $regex:''}})
.then(response=>{
    res.json({
        response
    })
})
.catch(error=>{
    console.log(error)
    res.json({
        message:"error"
    })
})
}

module.exports={api, getData}


