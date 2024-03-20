import { pool } from "../../db.js";

const addEntry = async (req, res) => {
  const { firstname, lastname, email, phoneNumber, createdAt, customUUID } =
    req.body;
  let fullname = `${firstname} ${lastname}`;

  try {
    const newEntry = await pool.query(
      "INSERT INTO tickets (customer_fullname, customer_email, customer_phone, created_at, custom_uuid) VALUES ($1, $2, $3, $4, $5) returning unique_id",
      [fullname, email, phoneNumber, createdAt, customUUID]
    );
    res.status(200).json(newEntry.rows);
  } catch (error) {
    //
  }
};
export default addEntry;
