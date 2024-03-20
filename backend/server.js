import express from "express";
const app = express();
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

// Routes
import { router as entriesRoutes } from "./routes/ticket_entries/entries.js";
import { router as termsAndCondtions } from "./routes/terms_and_conditions/terms.js";
import { router as backupTerms } from "./routes/backup_terms_and_conditions/index.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", entriesRoutes);
app.use("/", termsAndCondtions);
app.use("/", backupTerms);

const PORT = process.env.BACKEND_PORT;
app.listen(PORT, () => {
  console.log(`Server is up`);
});
