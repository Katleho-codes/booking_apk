import { pool } from "../../db.js";

const getBackupTermsAndConditions = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT term_id, term_description, is_bold from backup_terms"
    );
    res.json(rows);
  } catch (error) {
    //
  }
};

export default getBackupTermsAndConditions;
