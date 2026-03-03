// src/types/wcCasinoTypes.ts

export interface WcProviderTypes {
  id: number;
  game_name: string;
  game_uid: string;
  game_type: string;
  provider: string;
  icon: string;
}

export interface WcProviderResponse {
  game_list: {
    [key: string]: WcProviderTypes[];
  };
  status: number;
}
