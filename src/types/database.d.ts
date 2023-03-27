export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type Match = {
  date: string | null;
  match_id: number;
  region: string | null;
};

export interface Database {
  public: {
    Tables: {
      matches: {
        Row: Match;
        Insert: {
          date?: string | null;
          match_id: number;
          region?: string | null;
        };
        Update: Partial<Match>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
