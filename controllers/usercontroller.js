const uuid = require('uuid')
const path = require('path')
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class userController{
    async createUser(req, res, next){
        console.log(req.query)
        const {login, email, password} = req.body
        console.log(req.body)
        console.log(req.query)
        const hashPassword = await bcrypt.hash(password, 5)
        const result = await User.create({login, email, password: hashPassword});
        const token = generateJwt(result.login, result.email, result.role)
        return res.json({token})
        // if (info) {
        //     info = JSON.parse(info)
        //     info.forEach(i =>
        //         DeviceInfo.create({
        //             title: i.title,
        //             description: i.description,
        //             deviceId: device.id
        //         })
        //     )
        // }
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.login, user.email, user.role)
        console.log(token)
        const joffrey = 1234
        console.log({joffrey})
        console.log({token})
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async checkingauth(req,res,next){
        const joffrey = 1234
        return res.json(joffrey)
    }

}

module.exports = new userController()