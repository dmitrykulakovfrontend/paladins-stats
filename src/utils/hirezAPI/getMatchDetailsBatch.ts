import { Methods, API_ENDPOINT } from "../../constants.js";
import { type GetMatchDetailsBatchResponse } from "../../types/apiResponses.js";
import fetchAPI from "../fetchAPI.js";
import createSignature from "./misc/createSignature.js";
import createTimeStamp from "./misc/createTimeStamp.js";

/**
 * Function that gives detailed information about match ids, recommended maximum of 10 ids.
 * Requires hirez session id and array with ids as strings.
 *
 *
 * @param {string} sessionID - The hirez session id.
 * @param {Array} ids - Array with ids as strings.
 */
export default async function getMatchDetailsBatch(
  sessionID: string,
  ids: string[] | string,
) {
  const signature = createSignature(Methods.GET_MATCH_DETAILS_BATCH);
  const timestamp = createTimeStamp();
  const idsString = Array.isArray(ids) ? ids.join(",") : ids;

  const url = `${API_ENDPOINT}/${Methods.GET_MATCH_DETAILS_BATCH}json/${process.env.DEV_ID}/${signature}/${sessionID}/${timestamp}/${idsString}`;

  if (!ids) {
    throw new Error("No ids provided");
  }

  const data = await fetchAPI<GetMatchDetailsBatchResponse>(url);
  return data;
}
