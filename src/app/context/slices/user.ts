import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState, FavoritesUpdatePayload } from '../types';
import { User } from 'src/components/auth-dialog/interfaces';
import { Film } from 'src/app/shared-contracts';
import { getRequest, postRequest } from 'src/app/client';

const userInitialState: UserState = {
  id: null,
  favoritesCache: [],
  favoritesData: [],
  updated: null,
  status: 'idle',
  error: null,
};

const baseUrl = process.env.BASE_URL;

export const fetchAccountData = createAsyncThunk('user/fetchAccountData', async () => {
  const accountData: User = await getRequest(`${baseUrl}account/account_id`);
  return accountData.id;
});

export const fetchFavoritesList = createAsyncThunk<Film[], { id: string | number | undefined }>(
  'user/fetchFavoritesList',
  async ({ id }) => {
    const favoritesData = await getRequest(`${baseUrl}account/${id}/favorite/movies`);
    return favoritesData.results;
  }
);

export const updateFavoritesList = createAsyncThunk<
  Promise<number | undefined>,
  { id: number; favorite: boolean }
>('user/updateFavoritesList', async ({ id, favorite }) => {
  return await postRequest(id, favorite);
});

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    IDSetted(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    favoritesCached(state, action: PayloadAction<number[]>) {
      state.favoritesCache = action.payload;
    },
    favoritesUpdated(state, action: PayloadAction<FavoritesUpdatePayload>) {
      const { id, add } = action.payload;
      add
        ? state.favoritesCache.push(id)
        : (state.favoritesCache = state.favoritesCache.filter(cachedId => cachedId !== id));
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAccountData.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchFavoritesList.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(updateFavoritesList.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchAccountData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.id = action.payload;
    });
    builder.addCase(fetchFavoritesList.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.favoritesData = action.payload;
    });
    builder.addCase(updateFavoritesList.fulfilled, (state, action) => {
      if (typeof action.payload === 'number') state.updated = action.payload;
    });
    builder.addCase(fetchAccountData.rejected, (state, action) => {
      state.status = 'failed';
      if (typeof action.payload === 'string') state.error = action.payload;
    });
    builder.addCase(fetchFavoritesList.rejected, (state, action) => {
      state.status = 'failed';
      if (typeof action.payload === 'string') state.error = action.payload;
    });
    builder.addCase(updateFavoritesList.rejected, (state, action) => {
      state.status = 'failed';
      if (typeof action.payload === 'string') state.error = action.payload;
    });
  },
});
