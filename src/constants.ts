export const API_ENDPOINT = "https://api.paladins.com/paladinsapi.svc";
export const Minutes15InSeconds = 900;
export enum Methods {
  CREATE_SESSION = "createsession",
  GET_DATA_USED = "getdataused",
  GET_MATCH_IDS_BY_QUEUE = "getmatchidsbyqueue",
  GET_MATCH_DETAILS_BATCH = "getmatchdetailsbatch",
  GET_CHAMPIONS = "getchampions",
}

export enum Queues {
  SIEGE = "424",
  COMPETITIVE_KBM = "486",
}
