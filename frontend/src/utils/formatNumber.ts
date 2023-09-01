export default function formatNumber(value: string | number) {
  if (typeof value === "string") {
    value = value.includes(".") ? parseFloat(value) : parseInt(value);
  }
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
