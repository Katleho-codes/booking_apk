import { pool } from "../db.js";

const addEntry = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phoneNumber,
    fault,
    assetType,
    datetimestamp,
  } = req.body;
  let fullname = firstname + "" + lastname;

  try {
    const newEntry = await pool.query(
      "INSERT INTO tickets (customer_name, customer_email, customer_phone, created_at, unit_fault, type_of_unit) VALUES ($1, $2, $3, $4, $5, $6)",
      [fullname, email, phoneNumber, datetimestamp, fault, assetType]
    );
    res.status(200).json(newEntry.rows);
  } catch (error) {
    console.log("Ticket ID already exists");
  }
};
export default addEntry;
