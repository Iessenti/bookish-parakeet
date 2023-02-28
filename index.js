import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'

import bodyParser from 'body-parser'

import sequelize from './db.js'
import * as models from './models/models.js'
import router from './routers/index.js'

const __dirname = path.resolve()
const PORT = process.env.PORT || 5002

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({}))

app.use('/api', router)

const launch = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('ok', PORT))
    } catch (error) {
        throw error
    }
}

launch()
