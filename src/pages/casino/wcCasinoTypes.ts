// src/types/wcCasinoTypes.ts

export interface WcGame {
  prd_name: string;
  prd_category: string;
  game_id: number;
  game_name: string;
  table_id?: string;
  game_type?: string;
  is_enabled: number;
}

export interface WcCasinoResponse {
  game_list: {
    [key: string]: WcGame[];
  };
  status: number;
}
