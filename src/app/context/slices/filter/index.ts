import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchFilterData,
  fetchSearchedFilm,
  fetchSortedByGenresFilms,
  fetchSortedByYearsFilms,
} from './requests';
import { Genre, Film } from 'src/app/shared-contracts';
import { FilterState } from '../../types';

const filterInitialState: FilterState = {
  option: 1,
  years: [2024, 2024],
  byYearsSorted: [],
  genres: [],
  genresData: [],
  byGenresSorted: [],
  popular: [],
  rated: [],
  searched: [],
  page: 1,
  status: 'idle',
  error: null,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    genresSelected(state, action: PayloadAction<Genre[]>) {
      state.genres = action.payload;
    },
    optionSelected(state, action: PayloadAction<number>) {
      state.option = action.payload;
    },
    yearsSelected(state, action: PayloadAction<number | number[]>) {
      const payloadArray = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.years = [...payloadArray];
    },
    pageSelected(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    searchedFilmsUpdated(state, action: PayloadAction<Film[]>) {
      state.searched = action.payload;
    },
    filtersReset(state) {
      state.genres = [];
      state.option = 1;
      state.years = [2024, 2024];
      state.byYearsSorted = [];
      state.page = 1;
      state.searched = [];
      state.byGenresSorted = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFilterData.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchSearchedFilm.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchSortedByGenresFilms.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchSortedByYearsFilms.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchFilterData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.genresData = action.payload.genres;
      state.popular = action.payload.popular;
      state.rated = action.payload.rated;
    });
    builder.addCase(fetchSearchedFilm.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.searched = action.payload;
    });
    builder.addCase(fetchSortedByGenresFilms.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.byGenresSorted = action.payload;
    });
    builder.addCase(fetchSortedByYearsFilms.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.byYearsSorted = action.payload;
    });
    builder.addCase(fetchFilterData.rejected, (state, action) => {
      state.status = 'failed';
      if (typeof action.payload === 'string') state.error = action.payload;
    });
    builder.addCase(fetchSearchedFilm.rejected, (state, action) => {
      state.status = 'failed';
      if (typeof action.payload === 'string') state.error = action.payload;
    });
    builder.addCase(fetchSortedByGenresFilms.rejected, (state, action) => {
      state.status = 'failed';
      if (typeof action.payload === 'string') state.error = action.payload;
    });
    builder.addCase(fetchSortedByYearsFilms.rejected, (state, action) => {
      state.status = 'failed';
      if (typeof action.payload === 'string') state.error = action.payload;
    });
  },
});
