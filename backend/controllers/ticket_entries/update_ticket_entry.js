import { pool } from "../../db.js";

const updateEntry = async (req, res) => {
  const {
    fault,
    assetType,
    ticketNumber,
    updatedAt,
    customUUID,
    userTermsSignature, // will save it a as base 64 string
  } = req.body;
  try {
    const editQuery = await pool.query(
      "UPDATE tickets SET unit_fault = $1, type_of_unit = $2, ticket_number = $3, updated_at = $4, customer_signature = $5 WHERE custom_uuid = $6 returning *",
      [
        fault,
        assetType,
        ticketNumber,
        updatedAt,
        userTermsSignature,
        customUUID,
      ]
    );

    res.status(201).json(editQuery.rows);
  } catch (error) {
    console.log("update ticket error", error);
  }
};
export default updateEntry;
