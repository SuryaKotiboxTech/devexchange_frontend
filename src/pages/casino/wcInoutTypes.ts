// src/types/wcCasinoTypes.ts

export interface WcInout {
  id: number;
  game_name: string;
  game_uid: string;
  game_type: string;
  provider: string;
  icon: string;
}

export interface WcInoutResponse {
  game_list: {
    [key: string]: WcInout[];
  };
  status: number;
}
