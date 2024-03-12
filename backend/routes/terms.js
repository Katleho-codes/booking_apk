import express from "express";
const router = express.Router();

import getTerms from "../controllers/get_terms_and_conditions.js";

router.get("/terms_and_conditions", getTerms);

export { router };
