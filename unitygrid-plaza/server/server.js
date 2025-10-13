import express from 'express'
import cors from 'cors'
import './config/dotenv.js'
import eventsRouter from './routes/events.js'
import locationsRouter from './routes/locations.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/events', eventsRouter)
app.use('/api/locations', locationsRouter)

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align:center; margin-top:50px;">Virtual Community Space API</h1>')
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})