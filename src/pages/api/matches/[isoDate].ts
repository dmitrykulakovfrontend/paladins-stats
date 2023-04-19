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

  // const matchIds = matches.slice(0, 10).map((obj) => obj.Match);

  // const signatureBatch = createSignature(Methods.GET_MATCH_DETAILS_BATCH);
  // const timestampBatch = createTimeStamp();
  // const url = `${API_ENDPOINT}/${Methods.GET_MATCH_DETAILS_BATCH}json/${
  //   env.DEV_ID
  // }/${signatureBatch}/${sessionID}/${timestampBatch}/${matchIds.join(",")}`;
  // console.log(url);
  // const data = await fetchAPI<GetMatchIdsByQueueResponse>(url);
  res.status(200).json(formattedMatches);
});
