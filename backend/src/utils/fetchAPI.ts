import axios from "axios";
import { Methods } from "~/types/apiResponses.js";

// fetchAPI("getmatchinfo")
// fetchAPI("url/to/api")

export default async function fetchAPI<Type extends object>(method: string | Methods) {
  const response = await axios.get<Type>(url);
  if (response.status !== 200) {
    throw new HirezApiError(response.status, response.statusText, url);
  }
  if ("ret_msg" in response && response.ret_msg !== "Approved") {
    throw new HirezApiError(response.status, response.ret_msg as string, url);
  }
  if (Array.isArray(response)) {
    const result = response[0] as { ret_msg: string | null | undefined };
    if (result.ret_msg) {
      throw new HirezApiError(response.status, result.ret_msg, url);
    }
  }
  return response.data;
}
export class HirezApiError extends Error {
  status: number;
  url: string;
  error: boolean;

  constructor(status: number, message: string, url: string) {
    super(message);
    this.name = "HirezApiError";
    this.status = status;
    this.url = url;
    this.error = true;
  }
}
