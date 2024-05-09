const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
prisma.$connect().then(()=>{
    console.log('Postgres Prisma is connected');
})


module.exports = prisma