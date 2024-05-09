const {HandleUserLogout,HandleLoginPage,HandleSignupPage,HandleUserLogin,HandleUserSignup} = require('../controllers/user')
const express = require('express')
const router = express.Router()

router.get('/login',HandleLoginPage)
 
router.get('/signup',HandleSignupPage)
 
router.post('/signup',HandleUserSignup)
 
router.post('/login',HandleUserLogin)

router.post('/logout',HandleUserLogout)

module.exports = router
 