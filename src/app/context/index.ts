import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/user';
import { navigateSlice } from './slices/navigate';
import { filterSlice } from './slices/filter';
import { UserState, NavigateState, FilterState } from './types';

export type AppState = {
  filter: FilterState;
  user: UserState;
  navigate: NavigateState;
};

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    navigate: navigateSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const { userNavigatedToFilm } = navigateSlice.actions;
export const { IDSetted, favoritesCached, favoritesUpdated } = userSlice.actions;
export const {
  genresSelected,
  optionSelected,
  yearsSelected,
  pageSelected,
  searchedFilmsUpdated,
  filtersReset,
} = filterSlice.actions;
