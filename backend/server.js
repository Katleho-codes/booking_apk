import express from "express";
const app = express();
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

// Routes
import { router as entriesRoutes } from "./routes/entries.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", entriesRoutes);

const PORT = process.env.BACKEND_PORT;
app.listen(PORT, () => {
  console.log(`Server is up`);
});
