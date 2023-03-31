import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { Methods, API_ENDPOINT } from "~/constants";
import createSignature from "~/utils/createSignature";
import createTimeStamp from "~/utils/createTimeStamp";
import fetchAPI from "~/utils/fetchAPI";
import validateSession from "~/utils/validateSession";
import { z } from "zod";
import { type GetMatchDetailsBatch } from "../../types/apiResponses";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json(result);

  const signature = createSignature(Methods.GET_MATCH_DETAILS_BATCH);
  const timestamp = createTimeStamp();
  const sessionID = await validateSession(req, res);

  const result = z
    .object({
      id: z.string(),
    })
    .safeParse(req.body);
  let body;
  if (!result.success) {
    return res.status(503).json(new Error("Problem with id"));
  } else {
    body = result.data;
  }

  const matchIds = Object.values(body);

  const url = `${API_ENDPOINT}/${Methods.GET_MATCH_DETAILS_BATCH}json/${
    env.DEV_ID
  }/${signature}/${sessionID}/${timestamp}/${matchIds.join(",")}`;
  const data = await fetchAPI<GetMatchDetailsBatch>(url);

  // const { error } = await supabase.from("matches").insert(data);
  // if (error) {
  //   return res.status(503).json(error);
  // }
  // if (matches instanceof Error) return res.status(503).json(matches);
  // console.log(data);

  res.status(200).json(data);
}
