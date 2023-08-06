export const API_ENDPOINT = process.env.NODE_ENV === "development" ? "http://localhost:5001" : "https://paladins-stats-production.up.railway.app/";


export const Minutes15InSeconds = 900;
export enum Methods {
  CREATE_SESSION = "createsession",
  GET_DATA_USED = "getdataused",
  GET_MATCH_IDS_BY_QUEUE = "getmatchidsbyqueue",
  GET_MATCH_DETAILS_BATCH = "getmatchdetailsbatch",
  GET_CHAMPIONS = "getchampions",
  GET_PLAYER = "getplayer",
}

export enum Queues {
  SIEGE = "424",
  COMPETITIVE_KBM = "486",
  COMPETITIVE_GAMEPAD = "428",
}
