import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.listen(
    PORT,
    console.log(`Server is listening on port ${PORT} in ${NODE_ENV} mode.`)
)