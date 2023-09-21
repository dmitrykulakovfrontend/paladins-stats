import { Methods, API_ENDPOINT } from "../../constants.js";
import { type GetDataUsedResponse } from "../../types/apiResponses.js";
import fetchAPI from "../fetchAPI.js";
import createSignature from "./misc/createSignature.js";
import createTimeStamp from "./misc/createTimeStamp.js";

/**
 * Returns API Developer daily usage limits and the current status against those limits.
 *
 *
 * @param {string} sessionID - The hirez session id.
 */
export default async function getDataUsed(sessionID: string) {
  const signature = createSignature(Methods.GET_DATA_USED);
  const timestamp = createTimeStamp();

  const url = `${API_ENDPOINT}/${Methods.GET_DATA_USED}json/${process.env.DEV_ID}/${signature}/${sessionID}/${timestamp}`;

  const data = await fetchAPI<GetDataUsedResponse>(url);

  return data;
}
