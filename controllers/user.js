const prisma = require('../db/client')
const bcrpt = require('bcrypt')
const jwt = require('jsonwebtoken')

const HandleUserLogout = async(req,res)=>{
    res.render('login')
}

const HandleUserLogin=async (req,res)=>{
    const email = req.body.email;
    const userPassword = req.body.password;

    const user =await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(user){
        const hashedPassword = user.password;
        const checkPassword = await bcrpt.compare(userPassword,hashedPassword)
        if(checkPassword){
            const shortUrls =await prisma.shortUrlSchema.findMany({
                where:{email:email}
            })
            res.render('index',{shortUrls:shortUrls,email:email})
            
        }
        else{
            res.send('Password is incorrect')
        }
    }
    
}


const HandleUserSignup = async(req,res)=>{
    try{
     const hashedPassword = await bcrpt.hash(req.body.password,10)
     const user = prisma.user.create({
         data:{
             name:req.body.name,
             email:req.body.email,
             password:hashedPassword
         }
     })
     user.then((succ,err)=>{if(succ) res.render('login').status(200); else     res.send(err).status(401)})
 
    }catch(err){
     console.log(err);
     res.send('Something went wrong').status(401)
    }
 }

 const HandleLoginPage = (req,res)=>{
    res.render('login')
 }

 const HandleSignupPage = (req,res)=>{
    res.render('signup')
}

module.exports = {
    HandleLoginPage,
    HandleSignupPage,
    HandleUserLogin,
    HandleUserSignup,
    HandleUserLogout
}