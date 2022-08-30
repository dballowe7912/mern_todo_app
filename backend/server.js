import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

connectDB()

const app = express()

app.use(express.json())

app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.listen(
    PORT,
    console.log(`Server is listening on port ${PORT} in ${NODE_ENV} mode.`)
)