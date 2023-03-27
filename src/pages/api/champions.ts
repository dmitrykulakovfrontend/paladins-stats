import type { NextApiRequest, NextApiResponse } from "next";
import { API_ENDPOINT } from "~/constants";
import { env } from "~/env.mjs";
import validateSession from "~/utils/validateSession";
import { Methods } from "~/constants";
import createSignature from "../../utils/createSignature";
import createTimeStamp from "../../utils/createTimeStamp";
import { type GetDataUsedRes } from "~/types/apiResponses";
import fetchAPI from "~/utils/fetchAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = createSignature(Methods.GET_CHAMPIONS);
  const timestamp = createTimeStamp();
  const sessionID = await validateSession(req, res);

  const url = `${API_ENDPOINT}/${Methods.GET_CHAMPIONS}json/${env.DEV_ID}/${signature}/${sessionID}/${timestamp}/1`;
  const data = await fetchAPI<GetDataUsedRes>(url);
  console.log(url);

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, referer-path"
  );
  res.status(200).json(data);
}
