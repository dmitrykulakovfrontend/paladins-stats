import type { NextApiRequest, NextApiResponse } from "next";
import validateSession from "~/utils/hirezAPI/validateSession";
import withErrorHandler from "../../../utils/errorHandler";
import { info } from "~/utils/logging";
import calculateChampsAverage from "~/utils/calculateChampsAverage";
import { db } from "~/server/db";

export default withErrorHandler(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionID = await validateSession(req, res);
  const { ids } = req.query;
  if (!ids || typeof ids !== "string") {
    throw new Error(`No specified ids`);
  }

  const matches = await db
    .selectFrom("matches")
    .select("match_id")
    .where("date", "like", "%2023-04-19%")
    .execute();
  // transform matches id into array strings
  const matchesIds = matches.map((match) => String(match.match_id));
  const champions = await calculateChampsAverage(sessionID, matchesIds);

  res.status(200).json(champions);
});
