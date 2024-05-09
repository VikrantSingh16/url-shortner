require('dotenv').config()
const express = require('express')
const app = express()
const UrlRouter = require('./routes/url')
const UserRouter = require('./routes/user')
const UrlRedirectRouter = require('./routes/urlroute')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine','ejs')


app.use('/shorturls',UrlRouter)
app.use('/user',UserRouter)
app.use('/',UrlRedirectRouter)
const PORT = process.env.PORT || 3000
app.listen((PORT),(req,res)=>{console.log('Server is running at 3000');})

