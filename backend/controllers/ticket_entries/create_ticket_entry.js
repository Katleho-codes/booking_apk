import { pool } from "../../db.js";

const addEntry = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phoneNumber,
    createdAt,
    address,
    address2,
    city,
    state,
    zip,
    customUUID,
  } = req.body;
  let fullname = `${firstname} ${lastname}`;

  try {
    const newEntry = await pool.query(
      "INSERT INTO tickets (customer_fullname, customer_email, customer_phone, created_at,customer_address,customer_address_2,customer_city,customer_state,customer_zip, custom_uuid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning unique_id",
      [
        fullname,
        email,
        phoneNumber,
        createdAt,
        address,
        address2,
        city,
        state,
        zip,
        customUUID,
      ]
    );
    res.status(200).json(newEntry.rows);
  } catch (error) {
    console.log("Create entry error", error);
  }
};
export default addEntry;
