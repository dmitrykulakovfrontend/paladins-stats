import { type NextApiRequest, type NextApiResponse } from "next";
import { error } from "./logging";
import { HirezApiError } from "./fetchAPI";
import { DatabaseError } from "@planetscale/database";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const withErrorHandler =
  (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res);
    } catch (e) {
      if (e instanceof HirezApiError) {
        const { name, message, stack, url, status } = e;
        error({
          name,
          message,
          url,
          status,
          stack: stack
            ?.split("\n")
            .slice(1)
            .map((str) => str.trim())
            .reduce(
              (acc: Record<string, string>, curr, i) => ((acc[i] = curr), acc),
              {}
            ),
        });
        res.status(status).json({ name, message, url, status });
      } else if (e instanceof DatabaseError) {
        const { name, message, stack, status } = e;
        const shortMessage = message.replace(/\(:vtg1.+\)/g, "({REDACTED})");
        error({
          name,
          message: shortMessage,
          status,
          stack: stack
            ?.split("\n")
            .slice(1)
            .map((str) => str.trim())
            .reduce(
              (acc: Record<string, string>, curr, i) => ((acc[i] = curr), acc),
              {}
            ),
        });
        res.status(status).json({ name, message, status });
      } else if (e instanceof Error) {
        const { name, message, stack } = e;
        error({
          name,
          message,
          stack: stack
            ?.split("\n")
            .slice(1)
            .map((str) => str.trim())
            .reduce(
              (acc: Record<string, string>, curr, i) => ((acc[i] = curr), acc),
              {}
            ),
        });
        res.status(500).json({ name, message });
      }
    }
  };

export default withErrorHandler;
