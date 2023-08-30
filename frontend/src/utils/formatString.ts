export default function formatString(string: string) {
  return string.toLocaleLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
}
