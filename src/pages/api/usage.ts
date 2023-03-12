import type { NextApiRequest, NextApiResponse } from "next";
import { type RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { API_ENDPOINT } from "~/constants";
import { env } from "~/env.mjs";
import validateSession from "~/utils/validateSession";
import { Methods } from "~/constants";
import createSignature from "../../utils/createSignature";
import createTimeStamp from "../../utils/createTimeStamp";
import { type getDataUsedRes } from "~/types/apiResponses";
import fetchAPI from "~/utils/fetchAPI";

export default async function handler(
  req: NextApiRequest & { cookies: RequestCookies },
  res: NextApiResponse
) {
  const signature = createSignature(Methods.GET_DATA_USED);
  const timestamp = createTimeStamp();
  const sessionID = await validateSession(req, res);

  if (sessionID instanceof Error) return res.status(503).json(sessionID);

  const url = `${API_ENDPOINT}/${Methods.GET_DATA_USED}json/${env.DEV_ID}/${signature}/${sessionID}/${timestamp}`;
  const data = await fetchAPI<getDataUsedRes>(url);
  res.status(200).json(data);
}
