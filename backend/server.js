import express from "express";
const app = express();
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

// Routes
import { router as createEntryRoute } from "./routes/create_entry_route.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/entry", createEntryRoute);

const PORT = process.env.BACKEND_PORT;
app.listen(PORT, () => {
  console.log(`Server is up`);
});
