import type { NextApiRequest, NextApiResponse } from "next";
import { API_ENDPOINT } from "~/constants";
import { env } from "~/env.mjs";
import validateSession from "~/utils/hirezAPI/validateSession";
import { Methods } from "~/constants";
import createSignature from "../../utils/hirezAPI/misc/createSignature";
import createTimeStamp from "../../utils/hirezAPI/misc/createTimeStamp";
import { type GetDataUsedResponse } from "~/types/apiResponses";
import fetchAPI from "~/utils/fetchAPI";
import withErrorHandler from "~/utils/errorHandler";

export default withErrorHandler(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = createSignature(Methods.GET_DATA_USED);
  const timestamp = createTimeStamp();
  const sessionID = await validateSession(req, res);

  const url = `${API_ENDPOINT}/${Methods.GET_DATA_USED}json/${env.DEV_ID}/${signature}/${sessionID}/${timestamp}`;
  const data = await fetchAPI<GetDataUsedResponse>(url);
  res.status(200).json(data);
});
