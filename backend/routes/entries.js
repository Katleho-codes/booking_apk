import express from "express";
import addEntry from "../controllers/create_entry.js";
import updateEntry from "../controllers/update_entry.js";
import { limiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/entry", limiter, addEntry);
router.put("/:customUUID", updateEntry);

export { router };
