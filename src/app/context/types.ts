import { Film, Genre } from 'src/app/shared-contracts';

type Conditions = 'idle' | 'loading' | 'succeeded' | 'failed';

export type UserState = {
  id: number | null;
  favoritesCache: number[];
  favoritesData: Film[];
  updated: number | null;
  status: Conditions;
  error: string | null;
};

export type FavoritesUpdatePayload = {
  id: number;
  add: boolean;
};

export type NavigateState = {
  film: string;
};

export type FilterData = {
  genres: Genre[];
  popular: Film[];
  rated: Film[];
};

export type SelectData = {
  value: number;
  text: string;
};

export type FilterState = {
  selectData: SelectData[];
  option: number;
  years: number[];
  byYearsSorted: Film[];
  genres: Genre[];
  genresData: Genre[];
  byGenresSorted: Film[];
  popular: Film[];
  rated: Film[];
  searched: Film[];
  page: number;
  status: Conditions;
  error: string | null;
};
