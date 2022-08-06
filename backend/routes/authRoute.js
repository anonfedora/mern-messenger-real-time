const { userRegister, userLogin, userLogout, forgotPassword, resetPassword } = require('../controllers/authController');

const router = require('express').Router()
const {authMiddleware} = require('../middleware/authMiddleware');

router.post('/user-register', userRegister)
router.post('/user-login', userLogin)
router.post('/user-logout',authMiddleware, userLogout)
router.post('/password/forgot-password', forgotPassword)
router.put('/password/reset/:token', resetPassword)


module.exports = router;