import express from "express";
const router = express.Router();

import getTerms from "../../controllers/terms_and_conditions/get_terms_and_conditions.js";

router.get("/terms_and_conditions", getTerms);

export { router };
