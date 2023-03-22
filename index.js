require ('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const connectDb=require('./config/connectdb')
const userRoutes=require('./routes/userRoutes')
const newsRoutes=require('./routes/newsRoutes')
const cookieParser = require('cookie-parser')
const axios=require('axios')


const port=process.env.PORT
const MONGO_URI=process.env.MONGO_URI
connectDb(MONGO_URI)
app.use(express.json())
app.use(cookieParser())


app.use(cors())
app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
})

app.use("/api/user",userRoutes)
app.use("/api",newsRoutes)