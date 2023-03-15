import { Queues } from "./../../constants";
import type { NextApiRequest, NextApiResponse } from "next";
import { API_ENDPOINT } from "~/constants";
import { env } from "~/env.mjs";
import validateSession from "~/utils/validateSession";
import { Methods } from "~/constants";
import createSignature from "../../utils/createSignature";
import createTimeStamp from "../../utils/createTimeStamp";
import { type getDataUsedRes } from "~/types/apiResponses";
import fetchAPI from "~/utils/fetchAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = createSignature(Methods.GET_MATCH_IDS_BY_QUEUE);
  const timestamp = createTimeStamp();
  const sessionID = await validateSession(req, res);

  if (sessionID instanceof Error) return res.status(503).json(sessionID);

  const url = `${API_ENDPOINT}/${Methods.GET_MATCH_IDS_BY_QUEUE}json/${env.DEV_ID}/${signature}/${sessionID}/${timestamp}/${Queues.SIEGE}/20230314/`;

  const result = [];
  for (let hour = 0; hour <= 23; hour++) {
    result.push(await fetchAPI<getDataUsedRes>(`${url}/${hour}`));
  }
  const data = result;
  res.status(200).json(data.flat());
}
