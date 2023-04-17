import chalk from "chalk";

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
        chalk.yellow.bold(message)
      );
      break;
    }
    case "Info": {
      console.log(chalk.bgGray.bold.white(" INFO "), chalk.blue.bold(message));
      break;
    }
  }
}

export const error = (message: unknown) => log("Error", message);
export const warning = (message: unknown) => log("Warning", message);
export const info = (message: unknown) => log("Info", message);
