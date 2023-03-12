export default function createTimeStamp() {
  return new Date().toISOString().slice(0, -5).replace(/[-T:]/g, "");
}
