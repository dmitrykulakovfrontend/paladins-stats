import { Queues } from "./../../constants";
import type { NextApiRequest, NextApiResponse } from "next";
import { API_ENDPOINT } from "~/constants";
import { env } from "~/env.mjs";
import validateSession from "~/utils/hirezAPI/validateSession";
import { Methods } from "~/constants";
import createSignature from "../../utils/hirezAPI/misc/createSignature";
import createTimeStamp from "../../utils/hirezAPI/misc/createTimeStamp";
import fetchAPI from "~/utils/fetchAPI";
import { type GetMatchIdsByQueueResponse } from "../../types/apiResponses";
import getMatchIdsByQueue from "~/utils/hirezAPI/getMatchIdsByQueue";
import { DateTime } from "luxon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionID = await validateSession(req, res);
  const matches = await getMatchIdsByQueue(sessionID, {
    hour: 8,
    wholeDay: true,
  });
  if (matches instanceof Error) return res.status(503).json(matches);
  console.log(matches);
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
