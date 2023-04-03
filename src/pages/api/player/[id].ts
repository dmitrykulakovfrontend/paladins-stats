import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { Methods, API_ENDPOINT } from "~/constants";
import createSignature from "~/utils/createSignature";
import createTimeStamp from "~/utils/createTimeStamp";
import fetchAPI from "~/utils/fetchAPI";
import validateSession from "~/utils/validateSession";
import { z } from "zod";
import { type GetMatchDetailsBatch } from "../../../types/apiResponses";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json(result);

  const signature = createSignature(Methods.GET_PLAYER);
  const timestamp = createTimeStamp();
  const sessionID = await validateSession(req, res);

  const { id } = req.query;
  console.log({ id });
  if (!id || typeof id !== "string") {
    return res.status(503).json(new Error("Wrong player id"));
  }

  const url = `${API_ENDPOINT}/${Methods.GET_PLAYER}json/${env.DEV_ID}/${signature}/${sessionID}/${timestamp}/${id}`;
  const data = await fetchAPI<GetMatchDetailsBatch>(url);

  res.status(200).json(data);
}
