const express = require('express')
const router = express.Router()
const {handleDeleteURL,handleCreateShortURL,handleGetAllData,handleUpdateCountAndRedirect}=require('../controllers/url')



router.post('/save/:email',handleCreateShortURL)

router.get('/:email',handleGetAllData)

router.get('/:shortURL', handleUpdateCountAndRedirect)

router.post('/delete/:id',handleDeleteURL)

module.exports=router