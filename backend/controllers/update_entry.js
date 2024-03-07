import { pool } from "../db.js";

const updateEntry = async (req, res) => {
  try {
    const { fault, assetType, ticketNumber, updatedAt, customUUID } = req.body;

    const editQuery = await pool.query(
      "UPDATE tickets SET type_of_unit = $1, ticket_number = $2, unit_fault = $3, updated_at = $4 WHERE custom_uuid = $5 returning *",
      [assetType, ticketNumber, fault, updatedAt, customUUID]
    );
    res.status(201).json(editQuery.rows);
  } catch (error) {
    //
  }
};
export default updateEntry;
