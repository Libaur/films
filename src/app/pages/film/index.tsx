import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { UserState } from 'src/app/context/types';
import { AppDispatch, AppState, favoritesCached, favoritesUpdated } from '../../context';
import DetailedDescriptor from 'src/components/film/detailed-desc';
import LoadingPage from 'src/app/pages/loading';
import { fetchFavoritesList, updateFavoritesList } from 'src/app/context/slices/user';
import { checkStatus } from 'src/utils';
import { DetailedFilm } from './interfaces';

export default function FilmPage() {
  const imgUrl = process.env.IMG_URL;

  const favoritesCache = useSelector((state: AppState) => state.user.favoritesCache);
  const favoritesData = useSelector((state: AppState) => state.user.favoritesData);
  const statusCode = useSelector((state: AppState) => state.user.updated);

  const dispatch = useDispatch<AppDispatch>();
  const filmData = useLoaderData() as DetailedFilm;

  const currentId = filmData.id;
  const foundFilm = favoritesCache.find(id => id === currentId);

  const stateId = useSelector((state: UserState) => state.id);
  const userId = stateId ?? Cookies.get('userId');

  useEffect(() => {
    dispatch(fetchFavoritesList({ id: userId }));
  }, []);

  useEffect(() => {
    dispatch(favoritesCached(favoritesData.map(film => film.id)));
  }, [favoritesData]);

  const handleToggleFavorites = () => {
    const toggleOn = () => dispatch(favoritesUpdated({ id: currentId, add: true }));
    const toggleOff = () => dispatch(favoritesUpdated({ id: currentId, add: false }));
    if (foundFilm) {
      toggleOff();
      dispatch(updateFavoritesList({ id: currentId, favorite: false }));
      if (statusCode && !checkStatus(statusCode)) toggleOn();
    }
    if (!foundFilm) {
      toggleOn();
      dispatch(updateFavoritesList({ id: currentId, favorite: true }));
      if (statusCode && !checkStatus(statusCode)) toggleOff();
    }
  };

  return !currentId || !filmData ? (
    <LoadingPage />
  ) : (
    <Box display="flex" p={1} bgcolor="#FFF7FA">
      <Card sx={{ minWidth: '300px', mb: 2 }}>
        <CardMedia
          component="img"
          height="600"
          image={`${imgUrl}${filmData.poster_path}`}
          alt={filmData.title}
        />
      </Card>
      <CardContent sx={{ maxWidth: '800px' }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography gutterBottom variant="h4" component="h4" color={'#A8677E'}>
            {filmData.title}
          </Typography>
          <Card>{filmData.vote_average.toFixed(1)}</Card>
          <CardActions>
            <IconButton aria-label="add to favorites" onClick={handleToggleFavorites}>
              {foundFilm ? <StarIcon /> : <StarOutlineIcon />}
            </IconButton>
          </CardActions>
        </Stack>
        <Typography variant="body1" component="p" fontSize={15} pb={0.5}>
          {filmData.overview}
        </Typography>
        <DetailedDescriptor data={filmData} />
      </CardContent>
    </Box>
  );
}
