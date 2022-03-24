const router = require('express')
const Router = new router()
const userrouter = require('./userrouter')
const catalogrouter = require('./catalogrouter')
const authMiddleware = require('../middleware/authMiddleware')

// Router.use('/', function jopik(req,res,next) {
//     console.log('Заюзался роут /')
//     res.send('helloworlds') 
// })
// Router.get('/catalog', function jo1(req,res,next) {
//     res.send('temp1')
// })
// Router.get('/', function index(req,res,next) {
//     res.send('index')
// })

// Router.get('/temp', function index(req,res,next) {
//     res.sendfile('index1.html');
// })

Router.use('/user', userrouter)//user настроен
Router.use('/catalog', authMiddleware, catalogrouter)//каталог настраиваем

// Router.use('/temp', function jopik1(req,res,next) {
//     res.send('temp2')
// })
module.exports = Router