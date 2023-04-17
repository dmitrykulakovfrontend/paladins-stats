import type { NextApiRequest, NextApiResponse } from "next";
import getMatchIdsByQueue from "~/utils/hirezAPI/getMatchIdsByQueue";
import validateSession from "~/utils/hirezAPI/validateSession";
import { info } from "~/utils/logging";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionID = await validateSession(req, res);
  const matches = await getMatchIdsByQueue(sessionID, { hour: 16 });
  if (matches instanceof Error) return res.status(503).json(matches);
  // const matchIds = matches.slice(0, 10).map((obj) => obj.Match);

  // const signatureBatch = createSignature(Methods.GET_MATCH_DETAILS_BATCH);
  // const timestampBatch = createTimeStamp();
  // const url = `${API_ENDPOINT}/${Methods.GET_MATCH_DETAILS_BATCH}json/${
  //   env.DEV_ID
  // }/${signatureBatch}/${sessionID}/${timestampBatch}/${matchIds.join(",")}`;
  // console.log(url);
  // const data = await fetchAPI<GetMatchIdsByQueueResponse>(url);
  res.status(200).json(matches);
}
