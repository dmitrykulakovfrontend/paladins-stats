import { env } from "~/env.mjs";
import { createHash } from "crypto";
import { type Methods } from "~/constants";
import createTimeStamp from "./createTimeStamp";

export default function createSignature(method: Methods) {
  const timestamp = createTimeStamp();
  const stringtoHash = `${env.DEV_ID}${method}${env.AUTH_KEY}${timestamp}`;
  const hash = createHash("md5").update(stringtoHash).digest("hex");
  return hash;
}
