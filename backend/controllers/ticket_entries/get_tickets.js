import { pool } from "../../db.js";

const getAllTickets = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT unique_id, custom_uuid, customer_fullname, ticket_number, unit_fault, type_of_unit, DATE(created_at)::TEXT as created_date FROM tickets"
    );
    res.json(rows);
  } catch (error) {
    //
  }
};

export default getAllTickets;
