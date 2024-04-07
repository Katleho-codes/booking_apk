import { pool } from "../../db.js";

const getOneTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT unique_id, custom_uuid, customer_fullname, ticket_number, unit_fault, type_of_unit, DATE(created_at)::TEXT as created_date FROM tickets WHERE unique_id = $1",
      [id]
    );
    res.json(rows);
  } catch (error) {
    //
  }
};

export default getOneTicket;
