const prisma = require('../db/client')

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

const handleHomeRoute = (req,res)=>{
    res.render('home')
}

module.exports={handleUpdateCountAndRedirect,handleHomeRoute}