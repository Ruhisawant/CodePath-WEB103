import './dotenv.js'
import { pool } from './database.js'

const createLocationsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS locations CASCADE;

    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(50),
      zip VARCHAR(20),
      image VARCHAR(255)
    );
  `

  try {
    await pool.query(createTableQuery)
    console.log('✅ Locations table created successfully')
  } catch (err) {
    console.error('❌ Error creating locations table:', err)
  }
}

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events CASCADE;

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      time VARCHAR(50),
      location VARCHAR(255) NOT NULL,
      location_id INTEGER REFERENCES locations(id),
      description TEXT,
      image VARCHAR(255)
    );
  `

  try {
    await pool.query(createTableQuery)
    console.log('✅ Events table created successfully')
  } catch (err) {
    console.error('❌ Error creating events table:', err)
  }
}

const insertSampleData = async () => {
  const insertLocationsQuery = `
    INSERT INTO locations (name, address, city, state, zip) VALUES
    ('Echo Lounge', '123 Music St', 'Atlanta', 'GA', '30303'),
    ('House of Blues', '456 Blues Ave', 'Atlanta', 'GA', '30304'),
    ('Pavilion', '789 Concert Blvd', 'Atlanta', 'GA', '30305'),
    ('American Airlines Center', '321 Arena Dr', 'Atlanta', 'GA', '30306');
  `

  const insertEventsQuery = `
    INSERT INTO events (title, date, time, location, location_id, description) VALUES
    ('Rock Night', '2025-10-15', '8:00 PM', 'Echo Lounge', 1, 'Live rock music performance'),
    ('Jazz Evening', '2025-10-20', '7:00 PM', 'House of Blues', 2, 'Smooth jazz and blues'),
    ('Summer Festival', '2025-11-01', '6:00 PM', 'Pavilion', 3, 'Outdoor music festival'),
    ('Concert Series', '2025-11-10', '7:30 PM', 'American Airlines Center', 4, 'Major concert event');
  `

  try {
    await pool.query(insertLocationsQuery)
    console.log('✅ Sample locations inserted')
    await pool.query(insertEventsQuery)
    console.log('✅ Sample events inserted')
  } catch (err) {
    console.error('❌ Error inserting sample data:', err)
  }
}

const setup = async () => {
  await createLocationsTable()
  await createEventsTable()
  await insertSampleData()
  pool.end()
}

setup()