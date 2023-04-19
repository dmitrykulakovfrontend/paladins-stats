import { env } from "~/env.mjs";
import { Methods, API_ENDPOINT } from "~/constants";
import { type GetMatchDetailsBatchResponse } from "~/types/apiResponses";
import fetchAPI from "../fetchAPI";
import createSignature from "./misc/createSignature";
import createTimeStamp from "./misc/createTimeStamp";

/**
 * Function that gives an array of matches with basic information such as id, region and time.
 * Requires hirez session id and you can configure it with an optional object with options.
 *
 * By default takes full yesterday data.
 *
 * @param {string} sessionID - The hirez session id.
 * @param {Object} [options] - An optional object that can be used to configure the function.
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
