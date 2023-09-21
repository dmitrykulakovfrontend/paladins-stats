export const API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000"
    : "https://www.api.paladinsanalyzer.site";

export const Minutes15InSeconds = 900;
export enum Methods {
  CREATE_SESSION = "createsession",
  GET_DATA_USED = "getdataused",
  GET_MATCH_IDS_BY_QUEUE = "getmatchidsbyqueue",
  GET_MATCH_DETAILS_BATCH = "getmatchdetailsbatch",
  GET_CHAMPIONS = "getchampions",
  GET_PLAYER = "getplayer",
}

export const LINKS = [
  {
    title: "Meta",
    href: "/meta",
  },
  {
    title: "Roles Stats",
    href: "/roles",
  },
  {
    title: "Champions Stats",
    href: "/champions",
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
  },
];

export enum Queues {
  SIEGE = "424",
  COMPETITIVE_KBM = "486",
  COMPETITIVE_GAMEPAD = "428",
}
