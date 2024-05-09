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
    else{
        res.send('Email ID not found / Please check your email id')
    }
    
}


const HandleUserSignup = async(req,res)=>{
    if(req.body.password.length<7){
        res.status(201).json({msg:'Password length should be more than 6'})
    }
    else{
    try {
        const hashedPassword = await bcrpt.hash(req.body.password, 10);
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
        });
        
        console.log(user); // Optional: Log the created user

        res.render('login')
    } catch (error) {
        // Check if the error is due to unique constraint violation
        if (error.code === 'P2002' && error.meta && error.meta.target.includes('email')) {
            // Email is already in use
            res.status(400).json({ error: 'Email is already in use' });
        } else {
            // Other errors
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    }}
};
 

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