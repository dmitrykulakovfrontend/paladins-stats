import chalk from "chalk";
import morgan from "morgan";
import { getReasonPhrase } from "http-status-codes";
import axios from "axios";

type statuses = "Error" | "Warning" | "Info";
function log(type: statuses, message: unknown) {
  if (typeof message === "object") {
    message = JSON.stringify(message, null, 2);
  }
  switch (type) {
    case "Error": {
      console.log(chalk.bgRed.bold.white(" ERROR "), chalk.red.bold(message));
      break;
    }
    case "Warning": {
      console.log(
        chalk.bgYellow.bold.black(" WARNING "),
        chalk.yellow.bold(message),
      );
      break;
    }
    case "Info": {
      console.log(chalk.bgGray.bold.white(" INFO "), chalk.blue.bold(message));
      break;
    }
  }
}

export const logger = morgan(function (tokens, req, res) {
  return [
    "\n",
    chalk.hex("#f94144").bold("🍄  Logs --> "), // red
    chalk.hex("#90be6d").bold(tokens.method(req, res)), // green
    chalk.hex("#f9c74f").bold(tokens.status(req, res) + " ="), // yellow
    chalk
      .hex("#90be6d")
      .bold(getReasonPhrase(tokens.status(req, res) as string)), // green
    chalk.hex("#43aa8b").bold(tokens.url(req, res)), // teal
    chalk.hex("#577590").bold(tokens["response-time"](req, res) + " ms"), // blue-gray
    chalk.hex("#f94144").bold("@ " + tokens.date(req, res)), // red
    // chalk.yellow(tokens["remote-addr"](req, res)), // yellow
    // chalk
    //   .hex("#f8961e")
    //   .bold(
    //     tokens.referrer(req, res) ? "from " + tokens.referrer(req, res) : ""
    //   ), // orange
    // chalk.hex("#577590")(tokens["user-agent"](req, res)), // blue-gray
    "\n",
  ].join(" ");
});
export async function discordNotification(message: unknown) {
  await axios.post(process.env.DISCORD_HOOK_URL!, {
    content: `<@${process.env.DISCORD_MYID}> \`\`\`json\n${JSON.stringify(
      message,
      null,
      2,
    )}\n\`\`\``,
  });
}

export const error = (message: unknown) => log("Error", message);
export const warning = (message: unknown) => log("Warning", message);
export const info = (message: unknown) => log("Info", message);
