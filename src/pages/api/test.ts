import { Queues } from "./../../constants";
import type { NextApiRequest, NextApiResponse } from "next";
import { API_ENDPOINT } from "~/constants";
import { env } from "~/env.mjs";
import validateSession from "~/utils/validateSession";
import { Methods } from "~/constants";
import createSignature from "../../utils/createSignature";
import createTimeStamp from "../../utils/createTimeStamp";
import fetchAPI from "~/utils/fetchAPI";
import { type GetMatchIdsByQueue } from "../../types/apiResponses";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = createSignature(Methods.GET_MATCH_IDS_BY_QUEUE);
  const timestamp = createTimeStamp();
  const sessionID = await validateSession(req, res);

  if (sessionID instanceof Error) return res.status(503).json(sessionID);

  const urlMatchQueueIds = `${API_ENDPOINT}/${Methods.GET_MATCH_IDS_BY_QUEUE}json/${env.DEV_ID}/${signature}/${sessionID}/${timestamp}/${Queues.COMPETITIVE_KBM}/20230316/`;
  // fetch full data for yesterday
  // const result = [];
  // for (let hour = 0; hour <= 23; hour++) {
  //   result.push(await fetchAPI<GetMatchIdsByQueue>(`${url}/${hour}`));
  // }
  // const data = result;
  const matches = await fetchAPI<GetMatchIdsByQueue>(
    `${urlMatchQueueIds}/20,00`
  );
  if (matches instanceof Error) return res.status(503).json(matches);
  const matchIds = matches.slice(0, 10).map((obj) => obj.Match);

  const signatureBatch = createSignature(Methods.GET_MATCH_DETAILS_BATCH);
  const timestampBatch = createTimeStamp();
  const url = `${API_ENDPOINT}/${Methods.GET_MATCH_DETAILS_BATCH}json/${
    env.DEV_ID
  }/${signatureBatch}/${sessionID}/${timestampBatch}/${matchIds.join(",")}`;
  console.log(url);
  const data = await fetchAPI<GetMatchIdsByQueue>(url);

  res.status(200).json(data);
}
