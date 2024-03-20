import express from "express";
import addEntry from "../../controllers/ticket_entries/create_ticket_entry.js";
import updateEntry from "../../controllers/ticket_entries/update_ticket_entry.js";
import getAllTickets from "../../controllers/ticket_entries/get_tickets.js";
import { limiter } from "../../middleware/rateLimiter.js";

const router = express.Router();

router.post("/entry", limiter, addEntry);
router.put("/:customUUID", updateEntry);
router.get("/tickets", getAllTickets);


export { router };
