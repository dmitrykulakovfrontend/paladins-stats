import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { Methods, API_ENDPOINT } from "~/constants";
import createSignature from "~/utils/hirezAPI/misc/createSignature";
import createTimeStamp from "~/utils/hirezAPI/misc/createTimeStamp";
import fetchAPI from "~/utils/fetchAPI";
import validateSession from "~/utils/hirezAPI/validateSession";
import { z } from "zod";
import { type GetMatchDetailsBatchResponse } from "../../types/apiResponses";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json(result);

  const signature = createSignature(Methods.GET_MATCH_DETAILS_BATCH);
  const timestamp = createTimeStamp();
  const sessionID = await validateSession(req, res);

  const body = z
    .object({
      id: z.string(),
    })
    .parse(req.body);

  const matchIds = Object.values(body);

  const url = `${API_ENDPOINT}/${Methods.GET_MATCH_DETAILS_BATCH}json/${
    env.DEV_ID
  }/${signature}/${sessionID}/${timestamp}/${matchIds.join(",")}`;
  const data = await fetchAPI<GetMatchDetailsBatchResponse>(url);

  // const { error } = await supabase.from("matches").insert(data);
  // if (error) {
  //   return res.status(503).json(error);
  // }
  // if (matches instanceof Error) return res.status(503).json(matches);
  // console.log(data);

  res.status(200).json(data);
}
