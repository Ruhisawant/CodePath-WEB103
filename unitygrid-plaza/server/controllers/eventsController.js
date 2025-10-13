import { pool } from '../config/database.js'

export const getAllEvents = async (req, res) => {
  try {
    const { locationId } = req.query
    let result

    if (locationId) {
      result = await pool.query('SELECT * FROM events WHERE location_id = $1', [locationId])
    } else {
      result = await pool.query('SELECT * FROM events')
    }

    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching events:', err)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
}