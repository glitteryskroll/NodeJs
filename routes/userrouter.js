const Router = require('express')
const router = new Router()
const userController = require('../controllers/usercontroller')

router.get('/registration', (req,res,next)=>{
    res.send('регистрация')
})
router.post('/registration', userController.createUser)
router.post('/login', userController.login)
module.exports = router