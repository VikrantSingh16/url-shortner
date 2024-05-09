const express = require('express')
const {handleUpdateCountAndRedirect,handleHomeRoute} = require('../controllers/urlroute')
const router = express.Router()


router.get('/',handleHomeRoute)

router.get('/:shortURL',handleUpdateCountAndRedirect)


module.exports=router