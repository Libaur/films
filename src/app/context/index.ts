import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/user';
import { navigateSlice } from './slices/navigate';
import { filterSlice } from './slices/filter';
import { UserState, NavigateState, FilterState } from './types';

type AppState = {
  filter: FilterState;
  user: UserState;
  navigate: NavigateState;
};

type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    navigate: navigateSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export const useAppState: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

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
