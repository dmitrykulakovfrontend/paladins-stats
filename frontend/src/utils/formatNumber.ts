export default function formatNumber(value: string | number) {
  if (typeof value === "string") {
    value = value.includes(".") ? parseFloat(value) : parseInt(value);
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
