import { pool } from './database.js'
import './dotenv.js'
import foodData from '../data/foods.js'

const createFoodsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS foods;

    CREATE TABLE IF NOT EXISTS foods (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      spacecraft VARCHAR(255) NOT NULL,
      when_eaten VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      real_photo VARCHAR(255),
      description TEXT NOT NULL,
      how TEXT NOT NULL
    )
  `
  
  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 foods table created successfully')
  } catch (err) {
    console.error('⚠️ error creating foods table', err)
  }
}

const seedFoodsTable = async () => {
  await createFoodsTable()

  foodData.forEach((food) => {
    const insertQuery = {
      text: 'INSERT INTO foods (name, spacecraft, when_eaten, image, real_photo, description, how) VALUES ($1, $2, $3, $4, $5, $6, $7)'
    }

    const values = [
      food.name,
      food.spacecraft,
      food.when,
      food.image,
      food.realPhoto,
      food.description,
      food.how
    ]

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting food', err)
        return
      }
      console.log(`✅ ${food.name} added successfully`)
    })
  })
}

seedFoodsTable()