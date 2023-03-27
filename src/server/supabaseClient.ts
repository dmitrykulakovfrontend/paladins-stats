import { createClient } from "@supabase/supabase-js";
import { env } from "~/env.mjs";
import { type Database } from "~/types/database";

export const supabase = createClient<Database>(
  "https://datnifeiudydideiowjo.supabase.co",
  env.SUPABASE_ANON_KEY
);
