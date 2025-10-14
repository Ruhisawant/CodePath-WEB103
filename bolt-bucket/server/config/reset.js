import { pool } from './database.js'

async function reset() {
	try {
		await pool.query(`
			CREATE TABLE IF NOT EXISTS cars (
				id SERIAL PRIMARY KEY,
				model TEXT NOT NULL,
				exterior_color TEXT NOT NULL,
				wheels TEXT NOT NULL,
				interior TEXT NOT NULL,
				package TEXT NOT NULL,
				base_price NUMERIC(10,2) NOT NULL DEFAULT 0,
				total_price NUMERIC(10,2) NOT NULL DEFAULT 0,
				created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
			);
		`)

		// Optional: seed one example if table empty
		const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM cars')
		if (rows[0].count === 0) {
			await pool.query(
				`INSERT INTO cars (model, exterior_color, wheels, interior, package, base_price, total_price)
				 VALUES ($1,$2,$3,$4,$5,$6,$7)`,
				['Sport', 'Red', 'Performance', 'Black', 'Tech', 30000, 33500]
			)
		}

		console.log('Database reset complete.')
	} catch (err) {
		console.error('Reset failed:', err)
	} finally {
		await pool.end()
	}
}

// Run if called directly: node config/reset.js
if (import.meta.url === `file://${process.argv[1]}`) {
	reset()
}

export default reset