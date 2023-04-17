import { env } from "~/env.mjs";
import { Methods, API_ENDPOINT, Queues } from "~/constants";
import { type GetMatchIdsByQueueResponse } from "~/types/apiResponses";
import fetchAPI, { type HirezApiError } from "../fetchAPI";
import createSignature from "./misc/createSignature";
import createTimeStamp from "./misc/createTimeStamp";
import validateSession from "./validateSession";
import { DateTime } from "luxon";

type ProvidedOptions = {
  date?: DateTime;
  hour?: number;
  wholeDay?: boolean;
};

type DefaultOptions = {
  date: DateTime;
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
  options: ProvidedOptions
) {
  const defaultOptions: DefaultOptions = {
    date: DateTime.now().minus({ day: 1 }),
    wholeDay: true,
  };
  const actualOptions = { ...defaultOptions, ...options };
  const { date, wholeDay, hour } = actualOptions;
  const signature = createSignature(Methods.GET_MATCH_IDS_BY_QUEUE);
  const timestamp = createTimeStamp();

  const urlMatchQueueIds = `${API_ENDPOINT}/${
    Methods.GET_MATCH_IDS_BY_QUEUE
  }json/${env.DEV_ID}/${signature}/${sessionID}/${timestamp}/${
    Queues.COMPETITIVE_KBM
  }/${date.toFormat("yyyyMMdd")}`;

  let data;
  if (wholeDay) {
    // fetch all 24 hours
    const promises: Promise<GetMatchIdsByQueueResponse | HirezApiError>[] = [];
    for (let hour = 0; hour <= 23; hour++) {
      promises.push(
        fetchAPI<GetMatchIdsByQueueResponse>(`${urlMatchQueueIds}/${hour}`)
      );
    }
    const responses = await Promise.all(promises);
    data = responses.flat() as GetMatchIdsByQueueResponse;
  } else if (hour) {
    // fetch specified hour
    data = await fetchAPI<GetMatchIdsByQueueResponse>(
      `${urlMatchQueueIds}/${hour}`
    );
  }
  return data;
}
