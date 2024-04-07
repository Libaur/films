import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Preview } from './film/preview';
import { ShortDescription } from './film/short-desc';
import { AppState, userNavigatedToFilm } from 'src/app/context';
import { defineDisplayedContent } from 'src/utils';

export default memo(function Gallery() {
  const dispatch = useDispatch();
  const option = useSelector((state: AppState) => state.filter.option);
  const popular = useSelector((state: AppState) => state.filter.popular);
  const rated = useSelector((state: AppState) => state.filter.rated);

  const displayedContent = defineDisplayedContent({
    byFame: option === 1 ? popular : rated,
    bySearch: useSelector((state: AppState) => state.filter.searched),
    byYears: useSelector((state: AppState) => state.filter.byYearsSorted),
    byGenres: useSelector((state: AppState) => state.filter.byGenresSorted),
    genres: useSelector((state: AppState) => state.filter.genres),
  });

  const imgUrl = process.env.IMG_URL;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      sx={{
        '& > :not(style)': {
          m: 1,
          width: 240,
          height: 360,
        },
      }}
    >
      {displayedContent.map(movie => {
        const { id, title, poster_path, vote_average } = movie;
        return (
          <Paper key={id} elevation={2}>
            <Link to={`films/${id}`}>
              <Preview
                onClick={() => dispatch(userNavigatedToFilm(id.toString()))}
                image={`${imgUrl}${poster_path}`}
                title={title}
              />
            </Link>
            <Stack display="flex" flexDirection="row" justifyContent="space-between">
              <Stack>
                <ShortDescription props={{ pl: 1, pt: 1, fontSize: 14, fontWeight: 500 }}>
                  {title}
                </ShortDescription>
                <ShortDescription props={{ pl: 1, pt: 0.5, fontSize: 11 }}>
                  Рейтинг: {vote_average.toFixed(1)}
                </ShortDescription>
              </Stack>
            </Stack>
          </Paper>
        );
      })}
    </Box>
  );
});
