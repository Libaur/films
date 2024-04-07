import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const navigateSlice = createSlice({
  name: 'navigate',
  initialState: {
    film: '',
  },
  reducers: {
    userNavigatedToFilm(state, action: PayloadAction<string>) {
      state.film = action.payload;
    },
  },
});
