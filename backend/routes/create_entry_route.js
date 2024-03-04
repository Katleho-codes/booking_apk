import express from "express";
import addEntry from "../controllers/create_entry.js";
import { limiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", limiter, addEntry);

export { router };
