import type { NextApiRequest, NextApiResponse } from "next";
import validateSession from "~/utils/hirezAPI/validateSession";
import withErrorHandler from "../../../utils/errorHandler";
import { info } from "~/utils/logging";
import calculateChampsAverage from "~/utils/calculateChampsAverage";

export default withErrorHandler(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionID = await validateSession(req, res);
  const { ids } = req.query;
  if (!ids || typeof ids !== "string") {
    throw new Error(`No specified ids`);
  }
  const champions = await calculateChampsAverage(sessionID, ids.split(","));

  res.status(200).json(champions);
});
