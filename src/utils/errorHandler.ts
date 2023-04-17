import { type NextApiRequest, type NextApiResponse } from "next";
import { error } from "./logging";
import { type HirezApiError } from "./fetchAPI";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const withErrorHandler =
  (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res);
    } catch (e) {
      const { name, message, stack, url, status } = e as HirezApiError;
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
      res.status(500).json(e);
    }
  };

export default withErrorHandler;
