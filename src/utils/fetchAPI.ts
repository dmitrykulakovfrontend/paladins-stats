export default async function fetchAPI<T>(url: string) {
  const response = await fetch(url);
  if (response.status !== 200) {
    const error = {
      status: response.status,
      message: response.statusText,
      url,
      error: true,
    };
    console.error(error);
    return new Error(error.message, { cause: error.status });
  }
  const data = (await response.json()) as T;
  return data;
}
