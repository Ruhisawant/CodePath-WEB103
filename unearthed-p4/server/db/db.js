import pg from 'pg'
const { Pool } = pg;

function createPoolFromEnv() {
  const {
    DATABASE_URL,
    PGHOST,
    PGPORT,
    PGUSER,
    PGPASSWORD,
    PGDATABASE,
    PGSSLMODE,
  } = process.env;

  const common = {
    // Enable SSL for most managed Postgres providers; allow self-signed certs in dev
    ssl: PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000,
    max: 10,
  };

  if (DATABASE_URL) {
    return new Pool({ connectionString: DATABASE_URL, ...common });
  }

  if (PGHOST && PGUSER && PGDATABASE) {
    return new Pool({
      host: PGHOST,
      port: Number(PGPORT) || 5432,
      user: PGUSER,
      password: PGPASSWORD,
      database: PGDATABASE,
      ...common,
    });
  }

  // No DB configuration found
  return null;
}

export const pool = createPoolFromEnv();
export default pool;
