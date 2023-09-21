import { discordNotification, error } from "./logging.js";
import { HirezApiError } from "./fetchAPI.js";
import { DatabaseError } from "@planetscale/database";
import { NextFunction, Request, RequestHandler, Response } from "express";

async function errorHandler(err: unknown, _req: Request, res: Response) {
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
    res.status(500).json({ name, message });
  }
}

const formatStack = (stack?: string) => {
  return stack
    ?.split("\n")
    .slice(1)
    .map((str) => str.trim())
    .reduce(
      (acc: Record<string, string>, curr, i) => ((acc[i] = curr), acc),
      {},
    );
};

export function catchErrors(fn: RequestHandler): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next);
  };
}

export default errorHandler;
