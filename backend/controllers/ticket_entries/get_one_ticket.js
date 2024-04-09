import { pool } from "../../db.js";

const getOneTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT unique_id, custom_uuid, customer_fullname, customer_email, customer_phone, customer_address, customer_address_2,customer_city,customer_state,customer_zip,unit_fault, fault_occurence,unit_status,type_of_unit,ticket_number,imei,backup_needed,model_number,serial_number,repair_customer_id,warranty_period,service_order_number, DATE(created_at)::TEXT as created_date, purchase_date FROM tickets WHERE unique_id = $1",
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export default getOneTicket;
