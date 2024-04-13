import React, { useEffect } from 'react';
import { useAppState, useAppDispatch, genresSelected } from 'src/app/context';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { fetchSortedByGenresFilms } from 'src/app/context/slices/filter/requests';

export default function Genres() {
  const dispatch = useAppDispatch();
  const { page: currentPage, genres, genresData } = useAppState(state => state.filter);
  const genresIDs = genres.map(genre => genre.id).join(', ');

  useEffect(() => {
    if (genresIDs.length)
      dispatch(fetchSortedByGenresFilms({ value: genresIDs, page: currentPage }));
  }, [genresIDs, currentPage]);

  return (
    <Autocomplete
      sx={{ pl: 2.5, pr: 2.5 }}
      size="small"
      color="primary"
      multiple
      options={genresData}
      getOptionLabel={option => option.name}
      renderInput={params => (
        <TextField {...params} variant="standard" label="Жанры" placeholder="Выберите жанр" />
      )}
      value={genres}
      onChange={(event, selectedGenres) => dispatch(genresSelected(selectedGenres))}
    />
  );
}
