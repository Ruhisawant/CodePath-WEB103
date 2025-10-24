import { pool } from "./database.js";
import "./dotenv.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const currentPath = fileURLToPath(import.meta.url);

const tripsFile = fs.readFileSync(
  path.join(dirname(currentPath), "../config/data/trips.json")
);
const tripsData = JSON.parse(tripsFile);

const destinationsFile = fs.readFileSync(
  path.join(dirname(currentPath), "../config/data/destinations.json")
);
const destinationsData = JSON.parse(destinationsFile);

const activitiesFile = fs.readFileSync(
  path.join(dirname(currentPath), "../config/data/activities.json")
);
const activitiesData = JSON.parse(activitiesFile);

const createTripsTable = async () => {
  const createTripsTableQuery = `
      DROP TABLE IF EXISTS trips_users CASCADE;
      DROP TABLE IF EXISTS trips_destinations CASCADE;
      DROP TABLE IF EXISTS activities CASCADE;
      DROP TABLE IF EXISTS trips CASCADE;
      DROP TABLE IF EXISTS destinations CASCADE;
      DROP TABLE IF EXISTS users CASCADE;

      CREATE TABLE IF NOT EXISTS trips (
          id serial PRIMARY KEY,
          title varchar(100) NOT NULL,
          description varchar(500) NOT NULL,
          img_url text NOT NULL,
          num_days integer NOT NULL,
          start_date date NOT NULL,
          end_date date NOT NULL,
          total_cost money NOT NULL
      );
  `;

  try {
    await pool.query(createTripsTableQuery);
    console.log("🎉 trips table created successfully");
  } catch (err) {
    console.error("⚠️ error creating trips table", err);
  }
};

const seedTripsTable = async () => {
  await createTripsTable();

  for (const trip of tripsData) {
    const insertQuery = {
      text: "INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    };

    const values = [
      trip.title,
      trip.description,
      trip.img_url,
      trip.num_days,
      trip.start_date,
      trip.end_date,
      trip.total_cost,
    ];

    try {
      await pool.query(insertQuery, values);
      console.log(`✅ ${trip.title} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting trip", err);
    }
  }
};

const createDestinationsTable = async () => {
  const createDestinationsTableQuery = `
      CREATE TABLE IF NOT EXISTS destinations (
          id serial PRIMARY KEY,
          destination varchar(100) NOT NULL,
          description varchar(500) NOT NULL,
          city varchar(100) NOT NULL,
          country varchar(100) NOT NULL,
          img_url text NOT NULL,
          flag_img_url text NOT NULL
      );
  `;
  try {
    await pool.query(createDestinationsTableQuery);
    console.log("🎉 destinations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating destinations table", err);
  }
};

const seedDestinationsTable = async () => {
  await createDestinationsTable();

  for (const destination of destinationsData) {
    const insertQuery = {
      text: "INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url) VALUES ($1, $2, $3, $4, $5, $6)",
    };

    const values = [
      destination.destination,
      destination.description,
      destination.city,
      destination.country,
      destination.img_url,
      destination.flag_img_url,
    ];

    try {
      await pool.query(insertQuery, values);
      console.log(`✅ ${destination.destination} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting destination", err);
    }
  }
};

const createActivitiesTable = async () => {
  const createActivitiesTableQuery = `
      CREATE TABLE IF NOT EXISTS activities (
          id serial PRIMARY KEY,
          trip_id int NOT NULL,
          activity varchar(100) NOT NULL,
          num_votes integer DEFAULT 0,
          FOREIGN KEY(trip_id) REFERENCES trips(id)
      );
  `;
  try {
    await pool.query(createActivitiesTableQuery);
    console.log("🎉 activities table created successfully");
  } catch (err) {
    console.error("⚠️ error creating activities table", err);
  }
};

const seedActivitiesTable = async () => {
  await createActivitiesTable();

  for (const activity of activitiesData) {
    const insertQuery = {
      text: "INSERT INTO activities (trip_id, activity, num_votes) VALUES ($1, $2, $3)",
    };

    const values = [activity.trip_id, activity.activity, activity.num_votes];

    try {
      await pool.query(insertQuery, values);
      console.log(`✅ ${activity.activity} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting activity", err);
    }
  }
};

const createTripsDestinationsTable = async () => {
  const createTripsDestinationsTableQuery = `
      CREATE TABLE IF NOT EXISTS trips_destinations (
          trip_id int NOT NULL,
          destination_id int NOT NULL,
          PRIMARY KEY (trip_id, destination_id),
          FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
          FOREIGN KEY (destination_id) REFERENCES destinations(id) ON UPDATE CASCADE
      );
  `;
  try {
    await pool.query(createTripsDestinationsTableQuery);
    console.log("🎉 trips_destinations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating trips_destinations table", err);
  }
};

const createUsersTable = async () => {
  const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
          id serial PRIMARY KEY,
          githubid integer NOT NULL,
          username varchar(100) NOT NULL,
          avatarurl varchar(500) NOT NULL,
          accesstoken varchar(500) NOT NULL
      );
  `;
  try {
    await pool.query(createUsersTableQuery);
    console.log("🎉 users table created successfully");
  } catch (err) {
    console.error("⚠️ error creating users table", err);
  }
};

const createTripsUsersTable = async () => {
  const createTripsUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS trips_users (
          trip_id int NOT NULL,
          user_id int NOT NULL,
          PRIMARY KEY (trip_id, user_id),
          FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
      );
  `;
  try {
    await pool.query(createTripsUsersTableQuery);
    console.log("🎉 trips_users table created successfully");
  } catch (err) {
    console.error("⚠️ error creating trips_users table", err);
  }
};

const setup = async () => {
  await seedTripsTable();
  await seedDestinationsTable();
  await seedActivitiesTable();
  await createTripsDestinationsTable();
  await createUsersTable();
  await createTripsUsersTable();
  
  pool.end();
  console.log("✨ Database setup complete!");
};

setup();