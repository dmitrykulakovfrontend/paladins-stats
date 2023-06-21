import { discordNotification, error } from "./logging.js";
import { HirezApiError } from "./fetchAPI.js";
import { DatabaseError } from "@planetscale/database";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

async function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HirezApiError) {
    const { name, message, stack, url, status } = err;
    error({
      name,
      message,
      url,
      status,
      stack: formatStack(stack),
    });
    res.status(status).json({ name, message, url, status });
  } else if (err instanceof DatabaseError) {
    const { name, message, stack, status } = err;
    error({
      name,
      message,
      status,
      stack: formatStack(stack),
    });
    res.status(status).json({ name, message, status });
  } else if (err instanceof Error) {
    const { name, message, stack } = err;
    error({
      name,
      message,
      stack: formatStack(stack),
    });
    await discordNotification({
      name,
      message,
      stack: formatStack(stack),
    });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ name, message });
  }
}

const formatStack = (stack?: string) => {
  return stack
    ?.split("\n")
    .slice(1)
    .map((str) => str.trim())
    .reduce(
      (acc: Record<string, string>, curr, i) => ((acc[i] = curr), acc),
      {}
    );
};

export function catchErrors(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
}

export default errorHandler;
