import { pool } from "../../db.js";

const updateEntry = async (req, res) => {
  const {
    fault,
    assetType,
    ticketNumber,
    updatedAt,
    customUUID,
    pointOneChecked,
    pointTwoChecked,
    pointThreeChecked,
    pointFourChecked,
    reasonForNotCheckingPointTwo,
    reasonForNotCheckingPointThree,
    reasonForNotCheckingPointFour,
    userTermsSignature, // will save it a as base 64 string
  } = req.body;
  try {
    const editQuery = await pool.query(
      "UPDATE tickets SET unit_fault = $1, type_of_unit = $2, ticket_number = $3, updated_at = $4, terms_one_acknowledge = $5, terms_two_acknowledge = $6, terms_three_acknowledge = $7, terms_four_acknowledge = $8, terms_two_denial_reason = $9, terms_three_denial_reason = $10, terms_four_denial_reason = $11, customer_signature = $12 WHERE custom_uuid = $13 returning *",
      [
        fault,
        assetType,
        ticketNumber,
        updatedAt,
        pointOneChecked,
        pointTwoChecked,
        pointThreeChecked,
        pointFourChecked,
        reasonForNotCheckingPointTwo,
        reasonForNotCheckingPointThree,
        reasonForNotCheckingPointFour,
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
