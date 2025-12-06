-- schema.sql

-- Clean up old tables if they exist (handy while developing)
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS members;

-- MEMBERS table
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  created_at TIMESTAMP DEFAULT NOW()
);

-- WORKOUTS table (related to members)
CREATE TABLE workouts (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  type VARCHAR(50) NOT NULL,
  duration INTEGER NOT NULL,    -- minutes
  intensity INTEGER NOT NULL,   -- 1-10
  created_at TIMESTAMP DEFAULT NOW()
);

-- INSERT sample members (at least 5)
INSERT INTO members (name, email) VALUES
('Shiv', 'shiv@example.com'),
('Alex Johnson', 'alex@example.com'),
('Taylor Lee', 'taylor@example.com'),
('Jordan Smith', 'jordan@example.com'),
('Casey Brown', 'casey@example.com');

-- INSERT sample workouts (at least 5)
INSERT INTO workouts (member_id, date, type, duration, intensity) VALUES
(1, '2025-12-01', 'Strength', 60, 8),
(1, '2025-12-03', 'Cardio', 30, 7),
(2, '2025-12-02', 'Hypertrophy', 75, 9),
(3, '2025-11-30', 'Mobility', 20, 4),
(4, '2025-11-29', 'Strength', 45, 6),
(5, '2025-11-28', 'Cardio', 50, 7),
(2, '2025-12-04', 'Strength', 55, 8),
(3, '2025-12-04', 'Hypertrophy', 80, 9);

-- Example queries you can run manually:

-- 1. Basic SELECT
-- SELECT * FROM members;

-- 2. JOIN query between related tables
-- SELECT
--   m.name AS member_name,
--   w.date,
--   w.type,
--   w.duration,
--   w.intensity
-- FROM workouts w
-- JOIN members m ON w.member_id = m.id
-- ORDER BY w.date DESC;

-- 3. Aggregated query
-- SELECT
--   m.name AS member_name,
--   AVG(w.duration) AS avg_strength_duration
-- FROM workouts w
-- JOIN members m ON w.member_id = m.id
-- WHERE w.type = 'Strength'
-- GROUP BY m.name
-- ORDER BY avg_strength_duration DESC;