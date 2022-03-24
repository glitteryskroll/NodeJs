const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    login: {type: DataTypes.STRING, primaryKey: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Order = sequelize.define('Order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    totalprice: {type: DataTypes.INTEGER, allowNull: false},
})

const Order_book = sequelize.define('Order_Book', {
})

const Book_Genre = sequelize.define('Book_Genre', {
})

const Genre = sequelize.define('Genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Book = sequelize.define('Book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    author: {type: DataTypes.STRING, allowNull: false},
    href: {type: DataTypes.STRING, allowNull: true},
})

const Book_Info = sequelize.define('Book_Info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})


User.hasMany(Order)
Order.belongsTo(User)


Book.hasMany(Book_Info, {as: 'info'});
Book_Info.belongsTo(Book)

Genre.hasMany(Book)
Book.belongsTo(Genre)

Book.belongsToMany(Order, {through: Order_book })
Order.belongsToMany(Book, {through: Order_book })

// Book.belongsToMany(Genre, {through: Book_Genre })
// Genre.belongsToMany(Book, {through: Book_Genre }) 

module.exports = {
    User,
    Book,
    Book_Genre,
    Book_Info,
    Genre,
    Order,
}
