export type CreateSessionResponse = {
  ret_msg: string;
  session_id: string;
  timestamp: string;
};

export enum Methods {
  CREATE_SESSION = "createsession",
  GET_DATA_USED = "getdataused",
  GET_MATCH_IDS_BY_QUEUE = "getmatchidsbyqueue",
  GET_MATCH_DETAILS_BATCH = "getmatchdetailsbatch",
  GET_CHAMPIONS = "getchampions",
  GET_PLAYER = "getplayer",
  GET_PLAYER_HISTORY = "getmatchhistory",
}

export enum Queues {
  SIEGE = "424",
  COMPETITIVE_KBM = "486",
  COMPETITIVE_GAMEPAD = "428",
}

export type GetDataUsedResponse = [
  {
    Active_Sessions: number;
    Concurrent_Sessions: number;
    Request_Limit_Daily: number;
    Session_Cap: number;
    Session_Time_Limit: number;
    Total_Requests_Today: number;
    Total_Sessions_Today: number;
    ret_msg: string;
  }
];
export type GetMatchIdsByQueueResponse = {
  Active_Flag: string;
  Entry_Datetime: string;
  Match: string;
  Region: string;
  ret_msg: null | string;
}[];
export type GetMatchDetailsBatchResponse = Player[];
export type GetChampionsResponse = Champion[];

export type Champion = {
  Ability1: string;
  Ability2: string;
  Ability3: string;
  Ability4: string;
  Ability5: string;
  AbilityId1: number;
  AbilityId2: number;
  AbilityId3: number;
  AbilityId4: number;
  AbilityId5: number;
  Ability_1: Ability;
  Ability_2: Ability;
  Ability_3: Ability;
  Ability_4: Ability;
  Ability_5: Ability;
  ChampionAbility1_URL: string;
  ChampionAbility2_URL: string;
  ChampionAbility3_URL: string;
  ChampionAbility4_URL: string;
  ChampionAbility5_URL: string;
  ChampionCard_URL: string;
  ChampionIcon_URL: string;
  Cons: string;
  Health: number;
  Lore: string;
  Name: string;
  Name_English: string;
  OnFreeRotation: string;
  OnFreeWeeklyRotation: string;
  Pantheon: string;
  Pros: string;
  Roles: Roles;
  Speed: number;
  Title: string;
  Type: string;
  abilityDescription1: string;
  abilityDescription2: string;
  abilityDescription3: string;
  abilityDescription4: string;
  abilityDescription5: string;
  id: number;
  latestChampion: "n" | "y";
  ret_msg: null | string;
};

export type Ability = {
  Description: string;
  Id: number;
  Summary: string;
  URL: string;
  damageType: DamageType;
  rechargeSeconds: number;
};

export type DamageType = "Direct" | "AoE" | "True" | "Physical";

export type Roles =
  | "Paladins Flanker"
  | "Paladins Front Line"
  | "Paladins Damage"
  | "Paladins Support";

export type Player = {
  Account_Level: number;
  ActiveId1: number;
  ActiveId2: number;
  ActiveId3: number;
  ActiveId4: number;
  ActiveLevel1: number;
  ActiveLevel2: number;
  ActiveLevel3: number;
  ActiveLevel4: number;
  ActivePlayerId: string;
  Assists: number;
  BanId1: number;
  BanId2: number;
  BanId3: number;
  BanId4: number;
  BanId5: number;
  BanId6: number;
  Ban_1: string;
  Ban_2: string;
  Ban_3: string;
  Ban_4: string;
  Ban_5: string;
  Ban_6: string;
  Camps_Cleared: number;
  ChampionId: number;
  Damage_Bot: number;
  Damage_Done_In_Hand: number;
  Damage_Done_Magical: number;
  Damage_Done_Physical: number;
  Damage_Mitigated: number;
  Damage_Player: number;
  Damage_Taken: number;
  Damage_Taken_Magical: number;
  Damage_Taken_Physical: number;
  Deaths: number;
  Distance_Traveled: number;
  Entry_Datetime: string;
  Final_Match_Level: number;
  Gold_Earned: number;
  Gold_Per_Minute: number;
  Healing: number;
  Healing_Bot: number;
  Healing_Player_Self: number;
  ItemId1: number;
  ItemId2: number;
  ItemId3: number;
  ItemId4: number;
  ItemId5: number;
  ItemId6: number;
  ItemLevel1: number;
  ItemLevel2: number;
  ItemLevel3: number;
  ItemLevel4: number;
  ItemLevel5: number;
  ItemLevel6: number;
  Item_Active_1: string;
  Item_Active_2: string;
  Item_Active_3: string;
  Item_Active_4: string;
  Item_Purch_1: string;
  Item_Purch_2: string;
  Item_Purch_3: string;
  Item_Purch_4: string;
  Item_Purch_5: string;
  Item_Purch_6: string;
  Killing_Spree: number;
  Kills_Bot: number;
  Kills_Double: number;
  Kills_Fire_Giant: number;
  Kills_First_Blood: number;
  Kills_Gold_Fury: number;
  Kills_Penta: number;
  Kills_Phoenix: number;
  Kills_Player: number;
  Kills_Quadra: number;
  Kills_Siege_Juggernaut: number;
  Kills_Single: number;
  Kills_Triple: number;
  Kills_Wild_Juggernaut: number;
  League_Losses: number;
  League_Points: number;
  League_Tier: number;
  League_Wins: number;
  Map_Game: string;
  Mastery_Level: number;
  Match: number;
  Match_Duration: number;
  MergedPlayers: null;
  Minutes: number;
  Multi_kill_Max: number;
  Objective_Assists: number;
  PartyId: number;
  Platform: string;
  Rank_Stat_League: number;
  Reference_Name: string;
  Region: string;
  Skin: string;
  SkinId: number;
  Structure_Damage: number;
  Surrendered: number;
  TaskForce: number;
  Team1Score: number;
  Team2Score: number;
  TeamId: number;
  Team_Name: string;
  Time_In_Match_Seconds: number;
  Towers_Destroyed: number;
  Wards_Placed: number;
  Win_Status: string;
  Winning_TaskForce: number;
  hasReplay: string;
  hz_gamer_tag: null;
  hz_player_name: null;
  match_queue_id: number;
  name: string;
  playerId: string;
  playerName: string;
  playerPortalId: string;
  playerPortalUserId: string;
  ret_msg: null | string;
};
