import express from "express"
import dotenv from "dotenv"
import foodsRouter from "./routes/foods.js"

const app = express()

app.use('/public', express.static('./public'))
app.use('/scripts', express.static('./public/scripts'))

app.use('/foods', foodsRouter)

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align:center;margin-top:50px;">🍜 Cosmic-Chow API</h1>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})