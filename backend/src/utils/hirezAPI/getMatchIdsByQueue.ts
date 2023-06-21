import { Methods, API_ENDPOINT, Queues } from "../../constants.js";
import { type GetMatchIdsByQueueResponse } from "../../types/apiResponses.js";
import fetchAPI, { type HirezApiError } from "../fetchAPI.js";
import createSignature from "./misc/createSignature.js";
import createTimeStamp from "./misc/createTimeStamp.js";
import { DateTime } from "luxon";

type ProvidedOptions = {
  date?: DateTime;
  hour?: number;
  wholeDay?: boolean;
};

/**
 * Function that gives an array of matches with basic information such as id, region and time.
 * Requires hirez session id and you can configure it with an optional object with options.
 *
 * By default takes full yesterday data.
 *
 * @param {string} sessionID - The hirez session id.
 * @param {Object} [options] - An optional object that can be used to configure the function.
 */
export default async function getMatchIdsByQueue(
  sessionID: string,
  options: ProvidedOptions = {}
) {
  if (!options.date) options.date = DateTime.now().minus({ day: 1 });
  const signature = createSignature(Methods.GET_MATCH_IDS_BY_QUEUE);
  const timestamp = createTimeStamp();

  const urlMatchQueueIds = `${API_ENDPOINT}/${
    Methods.GET_MATCH_IDS_BY_QUEUE
  }json/${process.env.DEV_ID}/${signature}/${sessionID}/${timestamp}/${
    Queues.COMPETITIVE_KBM
  }/${options.date.setZone("UTC+0").toFormat("yyyyMMdd")}`;

  if (options.wholeDay && options.hour) {
    throw new Error("wholeDay and hour are exclusive");
  }
  if (!options.wholeDay && !options.hour) {
    options.wholeDay = true;
  }
  let data;
  if (options.wholeDay) {
    // fetch all 24 hours
    const promises: Promise<GetMatchIdsByQueueResponse | HirezApiError>[] = [];
    for (let hour = 0; hour <= 23; hour++) {
      promises.push(
        fetchAPI<GetMatchIdsByQueueResponse>(`${urlMatchQueueIds}/${hour}`)
      );
    }
    const responses = await Promise.all(promises);
    data = responses.flat() as GetMatchIdsByQueueResponse;
  } else if (options.hour) {
    // fetch specified hour
    data = await fetchAPI<GetMatchIdsByQueueResponse>(
      `${urlMatchQueueIds}/${options.hour}`
    );
  } else {
    throw new Error("Something went wrong");
  }
  return data;
}
