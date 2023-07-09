import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import { info, logger, error } from "./utils/logging.js";
import { StatusCodes } from "http-status-codes";
import { db } from "./model/db.js";
import apiRouter from "./routes/api/index.js";
import errorHandler, { catchErrors } from "./utils/errorHandler.js";
import fetchAPI from "./utils/fetchAPI.js";
import { API_ENDPOINT, Methods } from "./constants.js";
import createSignature from "./utils/hirezAPI/misc/createSignature.js";
import createTimeStamp from "./utils/hirezAPI/misc/createTimeStamp.js";
import { createSession } from "./utils/hirezAPI/session.js";
import getMatchDetailsBatch from "./utils/hirezAPI/getMatchDetailsBatch.js";

import cors from "cors";

const app: Application = express();
const port = 5001;
// Use Morgan with the Chalk-formatted output
app.use(logger);
app.use(cors({ origin: "*" }));

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("request");
  // throw new Error("Discord test");
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
