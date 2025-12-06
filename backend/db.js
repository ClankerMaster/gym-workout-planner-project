import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.USER,  // your mac username (works in Postgres.app)
  host: "localhost",
  database: "gym_planner",
  password: "",            // Postgres.app default user has no password
  port: 5432,
});

export default pool;