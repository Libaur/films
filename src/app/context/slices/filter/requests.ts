import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from 'src/app/shared-contracts';
import { FilterData } from '../../types';
import { getRequest } from 'src/app/client';

const baseUrl = process.env.BASE_URL;
const genresParams = process.env.GENRES_PARAMS;
const popularParams = process.env.POPULAR_PARAMS;
const ratedParams = process.env.RATED_PARAMS;
const searchIniialParams = process.env.SEARCH_INITIAL_PARAMS;
const searchFinalParams = process.env.SEARCH_FINAL_PARAMS;
const sortIniialParams = process.env.SORT_INITIAL_PARAMS;
const sortFinalParams = process.env.SORT_FINAL_PARAMS;
const from = process.env.YEAR_SMALLER_PARAMS;
const to = process.env.YEAR_LARGER_PARAMS;

export const fetchFilterData = createAsyncThunk<
  FilterData,
  { page: number },
  { rejectValue: string }
>('filter/fetchFilterData', async ({ page }, { rejectWithValue }) => {
  try {
    const [genresData, popularData, ratedData] = await Promise.all([
      getRequest(`${baseUrl}genre/${genresParams}`),
      getRequest(`${baseUrl}movie/${popularParams}${page}`),
      getRequest(`${baseUrl}movie/${ratedParams}${page}`),
    ]);
    return { genres: genresData.genres, popular: popularData.results, rated: ratedData.results };
  } catch (error) {
    return rejectWithValue('Ошибка при загрузке данных для фильтрации');
  }
});

export const fetchSearchedFilm = createAsyncThunk<
  Film[],
  { query: string; page: number },
  { rejectValue: string }
>('filter/fetchSearchedFilm', async ({ query, page }, { rejectWithValue }) => {
  try {
    const data = await getRequest(
      `${baseUrl}${searchIniialParams}${query}&${searchFinalParams}${page}`
    );
    return data.results;
  } catch (error) {
    return rejectWithValue('Ошибка при поиске фильма');
  }
});

export const fetchSortedByGenresFilms = createAsyncThunk<
  Film[],
  { value: string; page: number },
  { rejectValue: string }
>('filter/fetchSortedByGenresFilms', async ({ value, page }, { rejectWithValue }) => {
  try {
    const data = await getRequest(
      `${baseUrl}${sortIniialParams}${page}&${sortFinalParams}&with_genres=${value}`
    );
    return data.results;
  } catch (error) {
    return rejectWithValue('Ошибка при сортировке фильмов по жанру');
  }
});

export const fetchSortedByYearsFilms = createAsyncThunk<
  Film[],
  { smaller: string; larger: string; page: number },
  { rejectValue: string }
>('filter/fetchSortedByYearsFilms', async ({ smaller, larger, page }, { rejectWithValue }) => {
  try {
    const data = await getRequest(
      `${baseUrl}${sortIniialParams}${page}&${from}${smaller}-01-01&${to}${larger}-12-28&${sortFinalParams}`
    );
    return data.results;
  } catch (error) {
    return rejectWithValue('Ошибка при сортировке фильмов по году');
  }
});
