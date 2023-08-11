import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import { logger, error } from "./utils/logging.js";
import { StatusCodes } from "http-status-codes";
import apiRouter from "./routes/api/index.js";
import errorHandler from "./utils/errorHandler.js";

import cors from "cors";

const app: Application = express();
const port = process.env.PORT || 5001;
// Use Morgan with the Chalk-formatted output
app.use(logger);
app.use(cors({ origin: "*" }));

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(StatusCodes.OK).json({ message: "Server works!" });
});

app.use("/api", apiRouter);

app.use(errorHandler);

try {
  app.listen(port, () => {
    console.log(`Connected successfully on http://localhost:${port}`);
  });
} catch (e) {
  if (e instanceof Error) error(`Error occured: ${e.message}`);
}
export default app;
