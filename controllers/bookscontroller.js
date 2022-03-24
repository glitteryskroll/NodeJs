const uuid = require('uuid')
const path = require('path')
const {Book, Book_Info } = require('../models/models')
// const ApiError = require('../error/Api')

class BookControllers{
    async CreateBook(req, res, next){
        console.log(req.query)
        let {name, author, href} = req.query
            const device = await Book.create({name, author, href});
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
        return res.json(device)
    }
    async getAll(req,res){
        let books
        let {genre, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page
        if (!genre){
            books = await Book.findAndCountAll()
        }
        return res.json(books)

    }
}

module.exports = new BookControllers()