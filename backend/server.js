import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// GET workouts
app.get("/api/workouts", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT w.id, w.date, w.type, w.duration, w.intensity, m.name AS member_name
      FROM workouts w
      JOIN members m ON w.member_id = m.id
      ORDER BY w.date DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST workout
app.post("/api/workouts", async (req, res) => {
  const { memberName, date, type, duration, intensity } = req.body;

  try {
    // Find or create member
    let member = await pool.query("SELECT id FROM members WHERE name=$1", [memberName]);
    let memberId;

    if (member.rows.length > 0) {
      memberId = member.rows[0].id;
    } else {
      const newMember = await pool.query(
        "INSERT INTO members (name) VALUES ($1) RETURNING id",
        [memberName]
      );
      memberId = newMember.rows[0].id;
    }

    // Insert workout
    const result = await pool.query(
      `INSERT INTO workouts (member_id, date, type, duration, intensity)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [memberId, date, type, duration, intensity]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));