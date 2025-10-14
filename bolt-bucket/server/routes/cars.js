import express from 'express'
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/carsController.js'

const router = express.Router()

// GET /api/cars
router.get('/', getAllCars)

// GET /api/cars/:id
router.get('/:id', getCarById)

// POST /api/cars
router.post('/', createCar)

// PUT /api/cars/:id
router.put('/:id', updateCar)

// DELETE /api/cars/:id
router.delete('/:id', deleteCar)

export default router
