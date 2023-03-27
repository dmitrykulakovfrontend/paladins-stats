export default async function fetchAPI<T>(url: string) {
  const response = await fetch(url);
  if (response.status !== 200) {
    console.error({ status: response.status, text: response.statusText, url });
    return new HirezApiError(response.status, response.statusText, url);
  }
  const data = (await response.json()) as T;
  return data;
}
class HirezApiError extends Error {
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
