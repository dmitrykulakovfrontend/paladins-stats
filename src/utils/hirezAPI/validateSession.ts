import { getCookie, setCookie } from "cookies-next";
import { type NextApiRequest, type NextApiResponse } from "next";
import { API_ENDPOINT, Minutes15InSeconds } from "~/constants";
import { type CreateSessionResponse } from "~/types/apiResponses";
import { env } from "~/env.mjs";
import createSignature from "./misc/createSignature";
import { Methods } from "~/constants";
import createTimeStamp from "./misc/createTimeStamp";
import fetchAPI from "../fetchAPI";

export default async function validateSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let sessionID = "";
  const signature = createSignature(Methods.CREATE_SESSION);
  const timestamp = createTimeStamp();
  const session = getCookie("paladinssession", {
    req,
    res,
  });
  if (!session) {
    console.log("Creating session cookie...");
    const data = await fetchAPI<CreateSessionResponse>(
      `${API_ENDPOINT}/createsessionjson/${env.DEV_ID}/${signature}/${timestamp}`
    );
    if (data instanceof Error) {
      res.status(503).json(data);
      return "";
    }
    setCookie("paladinssession", data.session_id, {
      maxAge: Minutes15InSeconds,
      req,
      res,
    });
    console.log({ data });
    sessionID = data.session_id;
  } else {
    sessionID = session as string;
  }
  return sessionID;
}
