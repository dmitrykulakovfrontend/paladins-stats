import { type CreateSessionResponse } from "../../types/apiResponses.js";
import createSignature from "./misc/createSignature.js";
import { Methods, API_ENDPOINT } from "../../constants.js";
import createTimeStamp from "./misc/createTimeStamp.js";
import fetchAPI from "../fetchAPI.js";

export async function createSession() {
  const signature = createSignature(Methods.CREATE_SESSION);
  const timestamp = createTimeStamp();
  const session = await fetchAPI<CreateSessionResponse>(
    `${API_ENDPOINT}/createsessionjson/${process.env.DEV_ID}/${signature}/${timestamp}`,
  );
  return session.session_id;
}
