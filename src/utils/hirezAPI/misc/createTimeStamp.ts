import { DateTime } from "luxon";

/**
 * Creates a time stamp
 *
 * @returns string in format "20230323104241" (for 2023-03-23T10:42:41.085Z, as an example)
 *
 */
export default function createTimeStamp() {
  return DateTime.now().toUTC().toFormat("yyyyMMddHHmmss");
  // return new Date().toISOString().slice(0, -5).replace(/[-T:]/g, "");
}
