import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Element, animateScroll as move, scroller as revert } from 'react-scroll';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EastIcon from '@mui/icons-material/East';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Preview } from './film/preview';
import { ShortDescription } from './film/short-desc';
import {
  useAppState,
  useAppDispatch,
  userNavigatedToFilm,
  favoritesCached,
  pageSelected,
} from 'src/app/context';
import { fetchFavoritesList } from 'src/app/context/slices/user';
import { defineDisplayedContent } from 'src/utils';
import { filmStyle } from 'src/app/style/shared-styled';

export default memo(function Gallery() {
  const imgUrl = process.env.IMG_URL;
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

  const { id: userId, favoritesData, favoritesCache } = useAppState(state => state.user);

  useEffect(() => {
    dispatch(fetchFavoritesList({ id: userId }));
  }, []);

  useEffect(() => {
    dispatch(favoritesCached(favoritesData.map(film => film.id)));
  }, [favoritesData]);

  useEffect(() => {
    if (lastFilmClicked) {
      revert.scrollTo(lastFilmClicked, { offset: -150 });
    }
  }, [lastFilmClicked]);

  return (
    <React.Fragment>
      <Box display="flex" flexWrap="wrap" sx={filmStyle.box}>
        {displayedContent.map(movie => {
          const { id, title, poster_path, vote_average } = movie;
          return (
            <Paper key={id} elevation={4} sx={filmStyle.paper}>
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
              <Stack alignItems="end" sx={{ position: 'absolute', top: 5, right: 5 }}>
                {favoritesCache.includes(id) ? (
                  <FavoriteIcon sx={{ color: 'supplement.main' }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: 'supplement.main' }} />
                )}
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
