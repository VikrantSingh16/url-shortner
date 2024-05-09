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
app.listen((3000),(req,res)=>{console.log('Server is running at 3000');})

