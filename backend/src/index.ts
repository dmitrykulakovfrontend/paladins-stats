import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import { info, logger, error, discordNotification } from "./utils/logging.js";
import { StatusCodes } from "http-status-codes";
import { db } from "./model/db.js";
import apiRouter from "./routes/api/index.js";
import errorHandler, { catchErrors } from "./utils/errorHandler.js";
import fetchAPI, { HirezApiError } from "./utils/fetchAPI.js";
import { API_ENDPOINT, Methods } from "./constants.js";
import createSignature from "./utils/hirezAPI/misc/createSignature.js";
import createTimeStamp from "./utils/hirezAPI/misc/createTimeStamp.js";
import { createSession } from "./utils/hirezAPI/session.js";
import getMatchDetailsBatch from "./utils/hirezAPI/getMatchDetailsBatch.js";
import insertDailyStats from "./utils/insertDailyStats.js";

import cron from "node-cron";
import cors from "cors";
import { DatabaseError } from "@planetscale/database";

const app: Application = express();
const port = process.env.PORT || 5001;
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

async function runDailyLogic() {
  try {
    await discordNotification({
      started: true,
    });
    await insertDailyStats();
    await discordNotification({
      finished: true,
    });
  } catch (err) {
    if (err instanceof HirezApiError) {
      const { name, message, stack, url, status } = err;
      error({
        name,
        message,
        url,
        status,
        stack,
      });
    } else if (err instanceof DatabaseError) {
      const { name, message, stack, status } = err;
      error({
        name,
        message,
        status,
        stack,
      });
    } else if (err instanceof Error) {
      const { name, message, stack } = err;
      error({
        name,
        message,
        stack,
      });
      await discordNotification({
        name,
        message,
        stack,
      });
    }
  }
}

// Schedule the function to run every 24 hours at 1 AM America time
// Cron expression: '0 1 * * *' (1:00 AM America time)
cron.schedule("0 1 * * *", runDailyLogic);

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
