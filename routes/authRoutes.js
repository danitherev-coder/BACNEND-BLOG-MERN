const { login, googleSignIn, logout } = require('../controller/authController');

const router = require('express').Router();

router.post('/login', login)
router.post('/google', googleSignIn)
router.post('/logout', logout)

module.exports = router;