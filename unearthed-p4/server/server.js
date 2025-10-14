import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import giftsRouter from './routes/gifts.js'

// initalizie express
const app = express();

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(express.json())
app.use(cors())

// routes
app.use('/gifts', giftsRouter)

// simple health endpoint to verify server is up and env is loaded
app.get('/health', (req, res) => {
  res.json({
    ok: true,
    port: process.env.PORT || 3000,
    sampleData: process.env.USE_SAMPLE_DATA === 'true',
  })
})

// listens for app on port 300 for connections
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CONNECTED. Listening on port ${PORT}`)
  console.log(`USE_SAMPLE_DATA=${process.env.USE_SAMPLE_DATA}`)
})
