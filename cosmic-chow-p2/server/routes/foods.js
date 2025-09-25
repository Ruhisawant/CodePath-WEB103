import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import FoodsController from '../controllers/foods.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// all foods - now using controller
router.get('/', FoodsController.getFoods)

// individual food detail
router.get('/:foodId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/food.html'))
})

export default router