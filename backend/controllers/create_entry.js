import { pool } from "../db.js";

const addEntry = async (req, res) => {
  const { unitStatus } = req.body;

  try {
    const newEntry = await pool.query(
      "INSERT INTO tickets (unit_status) VALUES ($1)",
      [unitStatus]
    );
    res.status(200).json(newEntry.rows);
  } catch (error) {
    console.log("Ticket ID already exists");
  }
};
export default addEntry;
