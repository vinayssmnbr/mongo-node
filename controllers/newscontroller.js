const newsModel=require('../models/news')
const axios=require('axios')

const apiKey = '9328edd97a4f4c4c9795cda0730607ca';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

const api=async(req,res)=>{
    try{
        const response =await axios.get(apiUrl)
        const articles=response.data.articles;
        // const newsList=[];

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const news = new newsModel({
              title: article.title,
              description: article.description,
              url: article.url,
              urlToImage: article.urlToImage,
              publishedAt: article.publishedAt,

            });
        //    newsList.push(await news.save())
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
// res.send([{name:"rohit"}])
newsModel.find()
.then(response=>{
    res.json({
        response
    })
})
.catch(error=>{
    res.json({
        message:"error"
    })
})
}

module.exports={api, getData}
