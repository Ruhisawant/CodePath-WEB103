import { pool } from '../config/database.js'

const getGifts = async (req, res) => {
  try {
    console.log('Fetching gifts from database...')
    
    // Test database connection first
    const testConnection = await pool.query('SELECT NOW()')
    console.log('Database connection test successful:', testConnection.rows[0])
    
    const results = await pool.query('SELECT * FROM gifts ORDER BY id ASC')
    console.log('Query results:', results.rows)
    res.status(200).json(results.rows)
  } catch (error) {
    console.error('Error in getGifts:', error)
    console.error('Error stack:', error.stack)
    res.status(500).json({ error: error.message })
  }
}

const getGiftById = async (req, res) => {
  try {
    console.log('Fetching gift by ID:', req.params.giftId)
    const selectQuery = `
      SELECT name, pricePoint, audience, image, description, submittedBy, submittedOn
      FROM gifts
      WHERE id=$1
    `
    
    const giftId = req.params.giftId
    
    const results = await pool.query(selectQuery, [giftId])
    console.log('Gift query results:', results.rows)
    
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Gift not found' })
    }
    
    res.status(200).json(results.rows[0])
    
  } catch (error) {
    console.error('Error in getGiftById:', error)
    console.error('Error stack:', error.stack)
    res.status(500).json({ error: error.message })
  }
}

export default { getGifts, getGiftById }