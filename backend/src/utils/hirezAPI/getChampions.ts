import { Methods, API_ENDPOINT } from "../../constants.js";
import { type GetChampionsResponse } from "../../types/apiResponses.js";
import fetchAPI from "../fetchAPI.js";
import createSignature from "./misc/createSignature.js";
import createTimeStamp from "./misc/createTimeStamp.js";

/**
 *
 *
 *
 *
 *
 * @param {string} sessionID - The hirez session id.
 * @param {Object} [options] - An optional object that can be used to configure the function.
 */
export default async function getChampions(sessionID: string) {
  const signature = createSignature(Methods.GET_CHAMPIONS);
  const timestamp = createTimeStamp();
  const url = `${API_ENDPOINT}/${Methods.GET_CHAMPIONS}json/${process.env.DEV_ID}/${signature}/${sessionID}/${timestamp}/1`;

  const data = await fetchAPI<GetChampionsResponse>(url);
  return data;
}
