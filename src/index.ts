import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import { logger, error, discordNotification } from "./utils/logging.js";
import apiRouter from "./routes/api/index.js";
import errorHandler from "./utils/errorHandler.js";
import { HirezApiError } from "./utils/fetchAPI.js";
import insertDailyStats from "./utils/insertDailyStats.js";

import cron from "node-cron";
import cors from "cors";
import { DatabaseError } from "@planetscale/database";

const app: Application = express();
const port = Number(process.env.PORT || 5000);
export const isDev = process.env.NODE_ENV !== "production";
// Use Morgan with the Chalk-formatted output
app.use(logger);

app.use(cors({ origin: isDev ? "*" : "https://www.paladinsanalyzer.site" }));

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  console.log("request");
  // throw new Error("Discord test");
  return res.status(200).json({
    message: "Server works!",
  });
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
  app.listen(port, "0.0.0.0", () => {
    console.log(`Connected successfully on http://localhost:${port}`);
  });
} catch (e) {
  if (e instanceof Error) error(`Error occured: ${e.message}`);
}
export default app;
