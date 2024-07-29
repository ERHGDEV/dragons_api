const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const dragonsRouter = require('./controllers/dragons')

const app = express()

mongoose.set('strictQuery', false)

logger.info('connecting to db')

mongoose.connect(config.MONGODBURL)
    .then(() => {
        logger.info('connected to db')
    })
    .catch(error => {
        logger.error('error connecting to db:', error.message)
    })

app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/', dragonsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app