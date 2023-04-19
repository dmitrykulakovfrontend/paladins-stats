import type { NextApiRequest, NextApiResponse } from "next";
import getMatchIdsByQueue from "~/utils/hirezAPI/getMatchIdsByQueue";
import validateSession from "~/utils/hirezAPI/validateSession";
import withErrorHandler from "../../utils/errorHandler";
import { db } from "~/server/db";
import { DateTime } from "luxon";

export default withErrorHandler(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionID = await validateSession(req, res);
  const newMatches = await getMatchIdsByQueue(sessionID, {
    wholeDay: true,
    date: DateTime.now().minus({ day: 1 }),
  });

  const formattedNewMatches = newMatches.map((match) => ({
    match_id: +match.Match,
    date: new Date(match.Entry_Datetime),
    region: match.Region,
  }));
  const oldDateDay = DateTime.now().minus({ day: 8 }).toFormat("yyyy-MM-dd");
  await db
    .deleteFrom("matches")
    .where("date", "like", `%${oldDateDay}%`)
    .executeTakeFirstOrThrow();

  await db
    .insertInto("matches")
    .values(formattedNewMatches)
    .executeTakeFirstOrThrow();

  // const matchIds = matches.slice(0, 10).map((obj) => obj.Match);

  // const signatureBatch = createSignature(Methods.GET_MATCH_DETAILS_BATCH);
  // const timestampBatch = createTimeStamp();
  // const url = `${API_ENDPOINT}/${Methods.GET_MATCH_DETAILS_BATCH}json/${
  //   env.DEV_ID
  // }/${signatureBatch}/${sessionID}/${timestampBatch}/${matchIds.join(",")}`;
  // console.log(url);
  // const data = await fetchAPI<GetMatchIdsByQueueResponse>(url);
  res.status(200).json(formattedNewMatches);
});
