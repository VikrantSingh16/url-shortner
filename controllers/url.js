const prisma = require('../db/client')

const shortid = require('shortid')
const handleGetAllData = async(req,res)=>{
    const email = req.params.email;
    const shortUrls =await prisma.shortUrlSchema.findMany({
where:{
    email:email
}
    })
    
    res.render('index',{shortUrls:shortUrls,email:email})
    }

const handleUpdateCountAndRedirect = async(req,res)=>{
    
    const findURL = await prisma.shortUrlSchema.findMany({
        where:{
         
            shortURL:req.params.shortURL
        }
    })
    
    if(findURL.length==0){
        res.send('Not found')
    }
    else{
         await prisma.shortUrlSchema.updateMany({
            where: {
                shortURL:req.params.shortURL,
            },
            data: {
              count:findURL[0].count+1
            },
          })
        res.redirect(findURL[0].URL);
    }
}

const handleCreateShortURL = async(req,res)=>{
   
    const url = req.body.fullUrl;
    const email = req.params.email;
   await prisma.shortUrlSchema.create({
    data:{
        URL:url,
        email:email
        ,
        shortURL:shortid.generate()
    }
   }).then( async()=>{  const shortUrls =await prisma.shortUrlSchema.findMany({
    where:{
        email:email
    }
   })
 
    res.render('index',{shortUrls:shortUrls,email:email})})
}

const handleDeleteURL=async(req,res)=>{
    const id = req.params.id;
    const email =await prisma.shortUrlSchema.findMany({
        where:{
            shortURL:id
        }
       })

    await prisma.shortUrlSchema.deleteMany({
        where:
        {shortURL:id}
    }).then( async()=>{ 
        const shortUrls = await prisma.shortUrlSchema.findMany(({
            where:{
email:email[0].email
            }
        }))
  
       
    res.render('index',{shortUrls:shortUrls,email:email[0].email})})

}

module.exports={
    handleCreateShortURL,
    handleGetAllData,
    handleUpdateCountAndRedirect,
    handleDeleteURL
}