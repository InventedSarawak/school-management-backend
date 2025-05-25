import dotenv from 'dotenv'
import express from 'express'
dotenv.config()

import schoolRoutes from './routes/school.routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 3000

app.use('/', schoolRoutes)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
