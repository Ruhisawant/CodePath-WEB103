import { pool } from '../config/database.js'

// Simple validation for impossible combinations
// Rule examples:
// - package 'Offroad' requires wheels 'All-Terrain'
// - model 'Classic' cannot have exteriorColor 'Neon Green'
function validateCombo({ model, exteriorColor, wheels, interior, package: pkg }) {
  if (pkg === 'Offroad' && wheels !== 'All-Terrain') {
    return "Offroad package requires All-Terrain wheels."
  }
  if (model === 'Classic' && exteriorColor === 'Neon Green') {
    return "Classic model is not available in Neon Green."
  }
  return null
}

export async function getAllCars(req, res) {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY id DESC')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch cars' })
  }
}

export async function getCarById(req, res) {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id])
    if (result.rowCount === 0) return res.status(404).json({ error: 'Car not found' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch car' })
  }
}

export async function createCar(req, res) {
  try {
    const { model, exteriorColor, wheels, interior, package: pkg, basePrice, totalPrice } = req.body

    const errMsg = validateCombo({ model, exteriorColor, wheels, interior, package: pkg })
    if (errMsg) return res.status(400).json({ error: errMsg })

    const result = await pool.query(
      `INSERT INTO cars (model, exterior_color, wheels, interior, package, base_price, total_price)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [model, exteriorColor, wheels, interior, pkg, basePrice, totalPrice]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create car' })
  }
}

export async function updateCar(req, res) {
  try {
    const { id } = req.params
    const { model, exteriorColor, wheels, interior, package: pkg, basePrice, totalPrice } = req.body

    const errMsg = validateCombo({ model, exteriorColor, wheels, interior, package: pkg })
    if (errMsg) return res.status(400).json({ error: errMsg })

    const result = await pool.query(
      `UPDATE cars SET model=$1, exterior_color=$2, wheels=$3, interior=$4, package=$5, base_price=$6, total_price=$7
       WHERE id=$8 RETURNING *`,
      [model, exteriorColor, wheels, interior, pkg, basePrice, totalPrice, id]
    )
    if (result.rowCount === 0) return res.status(404).json({ error: 'Car not found' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update car' })
  }
}

export async function deleteCar(req, res) {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM cars WHERE id=$1 RETURNING id', [id])
    if (result.rowCount === 0) return res.status(404).json({ error: 'Car not found' })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete car' })
  }
}
