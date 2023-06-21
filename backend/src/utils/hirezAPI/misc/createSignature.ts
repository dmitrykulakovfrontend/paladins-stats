import { createHash } from "crypto";
import { type Methods } from "~/constants.js";
import createTimeStamp from "./createTimeStamp.js";

export default function createSignature(method: Methods) {
  const timestamp = createTimeStamp();
  const stringtoHash = `${process.env.DEV_ID}${method}${process.env.AUTH_KEY}${timestamp}`;
  const hash = createHash("md5").update(stringtoHash).digest("hex");
  return hash;
}
