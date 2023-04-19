import type { NextApiRequest, NextApiResponse } from "next";
import getMatchIdsByQueue from "~/utils/hirezAPI/getMatchIdsByQueue";
import validateSession from "~/utils/hirezAPI/validateSession";
import withErrorHandler from "../../../utils/errorHandler";
import { db } from "~/server/db";
import { DateTime } from "luxon";

export default withErrorHandler(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionID = await validateSession(req, res);
  const { isoDate } = req.query;
  if (!isoDate || typeof isoDate !== "string") {
    throw new Error(`No specified iso date`);
  }
  const matches = await getMatchIdsByQueue(sessionID, {
    wholeDay: true,
    date: DateTime.fromISO(isoDate),
  });

  const formattedMatches = matches.map((match) => ({
    match_id: +match.Match,
    date: new Date(match.Entry_Datetime),
    region: match.Region,
  }));

  await db
    .insertInto("matches")
    .values(formattedMatches)
    .executeTakeFirstOrThrow();

  res.status(200).json(formattedMatches);
});
