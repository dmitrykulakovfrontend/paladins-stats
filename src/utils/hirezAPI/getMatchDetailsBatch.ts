import { env } from "~/env.mjs";
import { Methods, API_ENDPOINT } from "~/constants";
import { type GetMatchDetailsBatchResponse } from "~/types/apiResponses";
import fetchAPI from "../fetchAPI";
import createSignature from "./misc/createSignature";
import createTimeStamp from "./misc/createTimeStamp";

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
  ids: string[] | string
) {
  const signature = createSignature(Methods.GET_MATCH_DETAILS_BATCH);
  const timestamp = createTimeStamp();
  const idsString = Array.isArray(ids) ? ids.join(",") : ids;

  const url = `${API_ENDPOINT}/${Methods.GET_MATCH_DETAILS_BATCH}json/${env.DEV_ID}/${signature}/${sessionID}/${timestamp}/${idsString}`;

  if (!ids) {
    throw new Error("No ids provided");
  }

  const data = await fetchAPI<GetMatchDetailsBatchResponse>(url);
  return data;
}
