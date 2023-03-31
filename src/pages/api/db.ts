import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { Methods, API_ENDPOINT, Queues } from "~/constants";
import createSignature from "~/utils/createSignature";
import createTimeStamp from "~/utils/createTimeStamp";
import fetchAPI from "~/utils/fetchAPI";
import validateSession from "~/utils/validateSession";
import { testSchema } from "../../utils/schemas/test";
import { type GetMatchIdsByQueue } from "~/types/apiResponses";
import { db } from "../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = createSignature(Methods.GET_MATCH_IDS_BY_QUEUE);
  const timestamp = createTimeStamp();
  const sessionID = await validateSession(req, res);

  const result = testSchema.safeParse(req.body);
  let body;
  if (!result.success) {
    return res.status(503).json(new Error("Problem with date"));
  } else {
    body = result.data;
  }
  const date = body.date.replace(/-/g, "");
  console.log({ date });

  const urlMatchQueueIds = `${API_ENDPOINT}/${Methods.GET_MATCH_IDS_BY_QUEUE}json/${env.DEV_ID}/${signature}/${sessionID}/${timestamp}/${Queues.COMPETITIVE_KBM}/${date}/`;
  const days = [];
  for (let hour = 0; hour <= 23; hour++) {
    days.push(fetchAPI<GetMatchIdsByQueue>(`${urlMatchQueueIds}/${hour}`));
  }
  const daysResults = await Promise.all(days);
  const data: { match_id: number; date: Date; region: string }[] = [];

  daysResults.forEach((result) => {
    if (result instanceof Error) {
      return res.status(503).json(new Error(result.message));
    } else {
      data.push(
        ...result.map((obj) => ({
          match_id: +obj.Match,
          date: new Date(obj.Entry_Datetime),
          region: obj.Region,
        }))
      );
    }
  });
  try {
    await db.insertInto("matches").values(data).executeTakeFirstOrThrow();
  } catch (error) {
    return res.status(503).json(error);
  }
  // if (matches instanceof Error) return res.status(503).json(matches);
  // console.log(matches);
  // const matchIds = matches.slice(0, 10).map((obj) => obj.Match);

  // const signatureBatch = createSignature(Methods.GET_MATCH_DETAILS_BATCH);
  // const timestampBatch = createTimeStamp();
  // const url = `${API_ENDPOINT}/${Methods.GET_MATCH_DETAILS_BATCH}json/${
  //   env.DEV_ID
  // }/${signatureBatch}/${sessionID}/${timestampBatch}/${matchIds.join(",")}`;
  // console.log(url);
  // const data = await fetchAPI<GetMatchIdsByQueue>(url);

  res.status(200).json(data);
}
