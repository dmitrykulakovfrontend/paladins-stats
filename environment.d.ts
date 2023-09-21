declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_KEY: string;
      DEV_ID: string;
      DATABASE_PASSWORD: string;
      DATABASE_USERNAME: string;
      DATABASE_HOST: string;
      DISCORD_HOOK_URL: string;
      DISCORD_MYID: string;
    }
  }
}
export {};
