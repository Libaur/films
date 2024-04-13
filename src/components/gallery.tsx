import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Element, animateScroll as move, scroller as revert } from 'react-scroll';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EastIcon from '@mui/icons-material/East';
import { Preview } from './film/preview';
import { ShortDescription } from './film/short-desc';
import { useAppState, useAppDispatch, userNavigatedToFilm, pageSelected } from 'src/app/context';
import { defineDisplayedContent } from 'src/utils';

export default memo(function Gallery() {
  const dispatch = useAppDispatch();
  const lastFilmClicked = useAppState(state => state.navigate.film);
  const {
    page,
    option: currentOption,
    genres,
    byGenresSorted,
    byYearsSorted,
    popular,
    rated,
    searched,
  } = useAppState(state => state.filter);

  const displayedContent = defineDisplayedContent({
    byFame: currentOption === 1 ? popular : rated,
    bySearch: searched,
    byYears: byYearsSorted,
    byGenres: byGenresSorted,
    genres: genres,
  });

  useEffect(() => {
    if (lastFilmClicked) {
      revert.scrollTo(lastFilmClicked, { offset: -150 });
    }
  }, [lastFilmClicked]);

  const imgUrl = process.env.IMG_URL;

  return (
    <React.Fragment>
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
            <Paper
              key={id}
              elevation={4}
              sx={{
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  backgroundColor: 'supplement.main',
                },
                backgroundColor: 'primary.main',
              }}
            >
              <Link to={`films/${id}`}>
                <Element name={id.toString()}>
                  <Preview
                    onClick={() => dispatch(userNavigatedToFilm(id.toString()))}
                    image={`${imgUrl}${poster_path}`}
                    title={title}
                  />
                </Element>
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
      <Stack display="flex" flexDirection="row" justifyContent="space-between">
        <Button onClick={move.scrollToTop}>Наверх</Button>
        <IconButton color="primary" onClick={() => dispatch(pageSelected(page + 1))}>
          <EastIcon />
        </IconButton>
      </Stack>
    </React.Fragment>
  );
});
