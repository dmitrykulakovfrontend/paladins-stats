// import { getCookie, setCookie } from "cookies-next";
// import { type NextApiRequest, type NextApiResponse } from "next";
// import { env } from "~/env.mjs";
import { type CreateSessionResponse } from "../../types/apiResponses.js";
import createSignature from "./misc/createSignature.js";
import { Methods, API_ENDPOINT, Minutes15InSeconds } from "../../constants.js";
import createTimeStamp from "./misc/createTimeStamp.js";
import fetchAPI from "../fetchAPI.js";
import { info } from "../logging.js";

// export async function validateSession(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   let sessionID = "";
//   const session = getCookie("paladinssession", {
//     req,
//     res,
//   });
//   if (!session) {
//     info("Creating session cookie...");
//     const id = await createSession();
//     if (id instanceof Error) {
//       res.status(503).json(id);
//       return "";
//     }
//     setCookie("paladinssession", id, {
//       maxAge: Minutes15InSeconds,
//       req,
//       res,
//     });
//     info({ id });
//     sessionID = id;
//   } else {
//     sessionID = session as string;
//   }
//   return sessionID;
// }

export async function createSession() {
  const signature = createSignature(Methods.CREATE_SESSION);
  const timestamp = createTimeStamp();
  const session = await fetchAPI<CreateSessionResponse>(
    `${API_ENDPOINT}/createsessionjson/${process.env.DEV_ID}/${signature}/${timestamp}`
  );
  return session.session_id;
}
