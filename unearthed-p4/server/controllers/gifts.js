import { pool } from "../db/db.js";
import giftData from "../data/gifts.js";

export const getGifts = async (request, response) => {
  try {
    // Use built-in dataset if enabled (for dev when DB is unreachable)
      if (process.env.USE_SAMPLE_DATA === "true") {
          console.log('getGifts: serving built-in sample data');
      const normalized = giftData.map((g) => ({
        id: g.id,
        name: g.name,
        pricepoint: g.pricePoint,
        audience: g.audience,
        image: g.image,
        description: g.description,
        submittedby: g.submittedBy,
        submittedon: g.submittedOn,
      }));
      return response.status(200).json(normalized);
    }

    if (!pool) {
      // No DB configured; guide the developer
      return response.status(503).json({
        error: "Database is not configured",
        hint: "Set DATABASE_URL or PG* env vars, or set USE_SAMPLE_DATA=true for local dev.",
      });
    }

          console.log('getGifts: querying database', {
              host: process.env.PGHOST || (process.env.DATABASE_URL ? 'DATABASE_URL' : 'unknown'),
              db: process.env.PGDATABASE,
          });
      const results = await pool.query("SELECT * FROM gifts ORDER BY id ASC");
    response.status(200).json(results.rows);
  } catch (error) {
    // Log the error for server diagnostics and return a 500 (Internal Server Error)
    console.error("getGifts error:", error);
    response.status(500).json({ error: error.message });
  }
};

export const getGiftById = async (req, res) => {
  try {
    const id = parseInt(req.params.giftId);
    if (process.env.USE_SAMPLE_DATA === 'true') {
      const match = giftData.find((g) => g.id === id);
      if (!match) return res.status(404).json({ error: 'Not found' });
      const normalized = {
        id: match.id,
        name: match.name,
        pricepoint: match.pricePoint,
        audience: match.audience,
        image: match.image,
        description: match.description,
        submittedby: match.submittedBy,
        submittedon: match.submittedOn,
      };
      return res.status(200).json(normalized);
    }
    if (!pool) return res.status(503).json({ error: 'Database is not configured' });
    const result = await pool.query('SELECT * FROM gifts WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('getGiftById error:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const createGift = async (req, res) => {
  try {
    const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body
    const results = await pool.query(`
      INSERT INTO gifts (name, pricepoint, audience, image, description, submittedby, submittedon)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [name, pricepoint, audience, image, description, submittedby, submittedon]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const updateGift = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body
    const results = await pool.query(`
      UPDATE gifts SET name = $1, pricepoint = $2, audience = $3, image = $4, description = $5, submittedby = $6, submittedon= $7 WHERE id = $8`,
      [name, pricepoint, audience, image, description, submittedby, submittedon, id]
    )
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

export const deleteGift = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('DELETE FROM gifts WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}