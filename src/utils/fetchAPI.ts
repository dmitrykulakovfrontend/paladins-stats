import { error } from "./logging";
export default async function fetchAPI<T extends object>(url: string) {
  const response = await fetch(url);
  if (response.status !== 200) {
    error({ status: response.status, text: response.statusText, url });
    return new HirezApiError(response.status, response.statusText, url);
  }
  const data = (await response.json()) as T;
  if ("ret_msg" in data && data.ret_msg !== "Approved") {
    error({ status: response.status, text: data.ret_msg, url });
    return new HirezApiError(response.status, data.ret_msg as string, url);
  }
  return data;
}
export class HirezApiError extends Error {
  status: number;
  url: string;
  error: boolean;

  constructor(status: number, message: string, url: string) {
    super(message);
    this.status = status;
    this.url = url;
    this.error = true;
  }
}
