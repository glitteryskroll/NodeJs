const jwt = require('jsonwebtoken')
const function_next = require('../controllers/catalogcontroller')

module.exports = function (req, res, next) {
    // if (req.method === "OPTIONS") {
    //     next()
    // }
    try {
        console.log('тут чета2')
        console.log(req.body)
        const token = req.body.token// Bearer asfasnfkajsfnjk
        console.log(token)
        console.log('тут чет31')
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        console.log(process.env.SECRET_KEY)
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded)
        console.log('сработало?')
        req.user = decoded
        next(function_next.iflogged_in_response(req,res,next))
    } catch (e) {
        console.log('тут чета1')
        res.status(401).json({message: "Не авторизован"})
    }
};
