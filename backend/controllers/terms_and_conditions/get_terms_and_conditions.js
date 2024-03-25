import { pool } from "../../db.js";

const getTerms = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT term_id, term_description, is_bold from terms_and_conditions"
    );
    res.json(rows);
  } catch (error) {
    //
  }
};

export default getTerms;
