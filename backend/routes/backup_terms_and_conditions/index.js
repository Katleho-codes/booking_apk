import express from "express";
const router = express.Router();

import getBackupTermsAndConditions from "../../controllers/backup_terms_and_conditions/get.js";

router.get("/backup_terms_and_conditions", getBackupTermsAndConditions);

export { router };
