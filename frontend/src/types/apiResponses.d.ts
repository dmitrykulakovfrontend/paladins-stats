export interface ChampionStats {
  globalStats: GlobalStats;
  weeklyStats: WeeklyStat[];
}

export interface GlobalStats {
  name: string;
  id: number;
  role: string;
  icon: string;
  winrate: string;
  pickrate: string;
  KDA: string;
  damage_10_min: string;
  deaths_10_min: string;
  assists_10_min: string;
  kills_10_min: string;
  solo_kills_10_min: string;
  self_healing_10_min: string;
  gold_per_minute_10_min: string;
  healing_10_min: string;
  shielding_10_min: string;
  objective_time_10_min: string;
}

export interface Roles {
  rolesData: RoleData[];
}

export interface RoleData {
  role: string;
  winrate: string;
  pickrate: string;
  KDA: string;
  damage_10_min: string;
  deaths_10_min: string;
  assists_10_min: string;
  kills_10_min: string;
  solo_kills_10_min: string;
  self_healing_10_min: string;
  gold_per_minute_10_min: string;
  healing_10_min: string;
  shielding_10_min: string;
  objective_time_10_min: string;
}

export interface WeeklyStat {
  winrate: string;
  pickrate: string;
  date: Date;
}
