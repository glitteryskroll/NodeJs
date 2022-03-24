const {Book, Book_Info } = require('../models/models')

class response {
    async getAll(req,res){
        let {genre, limit,page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
    }
}
module.exports = new response()