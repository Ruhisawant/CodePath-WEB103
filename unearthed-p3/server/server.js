import express from 'express'
import './config/dotenv.js'
import cors from 'cors'
import giftsRouter from './routes/gifts.js'
import { pool } from './config/database.js'  // Add this import

const app = express()

app.use(cors())
app.use('/gifts', giftsRouter)

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>')
})

const PORT = process.env.PORT || 3001

// Test database connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err)
  } else {
    console.log('✅ Database connected successfully')
    release()
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})