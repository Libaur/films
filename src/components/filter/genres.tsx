import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState, genresSelected } from 'src/app/context';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Genre } from '../../app/shared-contracts';
import { fetchSortedByGenresFilms } from 'src/app/context/slices/filter/requests';

export default function Genres({ content }: { content: Genre[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const genres = useSelector((state: AppState) => state.filter.genres);

  const genresIDs = genres.map(genre => genre.id).join(', ');

  const currentPage = useSelector((state: AppState) => state.filter.page);

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
      options={content}
      getOptionLabel={option => option.name}
      renderInput={params => (
        <TextField {...params} variant="standard" label="Жанры" placeholder="Выберите жанр" />
      )}
      value={genres}
      onChange={(event, selectedGenres) => dispatch(genresSelected(selectedGenres))}
    />
  );
}
