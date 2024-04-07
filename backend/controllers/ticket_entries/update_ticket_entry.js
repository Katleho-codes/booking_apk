import { pool } from "../../db.js";

const updateEntry = async (req, res) => {
  const {
    fault,
    faultOccurence,
    assetType,
    ticketNumber,
    updatedAt,
    modelNumber,
    serialNumber,
    IMEI,
    isBackUpNeedCheckboxEnabled,
    warranty,
    customUUID,
  } = req.body;
  try {
    const editQuery = await pool.query(
      "UPDATE tickets SET unit_fault = $1, fault_occurence = $2, type_of_unit = $3, ticket_number = $4, updated_at = $5, model_number = $6, serial_number = $7, imei = $8, backup_needed = $9, warranty_period = $10  WHERE custom_uuid = $11 returning *",
      [
        fault,
        faultOccurence,
        assetType,
        ticketNumber,
        updatedAt,
        modelNumber,
        serialNumber,
        IMEI,
        isBackUpNeedCheckboxEnabled,
        warranty,
        customUUID,
      ]
    );

    res.status(201).json(editQuery.rows);
  } catch (error) {
    // console.log("update ticket error", error);
  }
};
export default updateEntry;
