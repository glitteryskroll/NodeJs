require('dotenv').config()
const express = require('express')
const routers = require('./routes/routing')
const path = require('path')
const sequelize = require('./db')
const models = require('./models/models')
const port = process.env.PORT
const cors = require('cors')
const app= express()
console.log(port)

app.use(cors())
app.use(express.json())
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => console.log(`Server started on port ${port}`))
    } catch (e) {
        console.log(e)
    }
}

app.use('/api',routers)

start()