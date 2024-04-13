import React, { useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Stack,
  Button,
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import DetailedDescriptor from 'src/components/film/detailed-desc';
import { AppBar } from 'src/app/style/shared-styled';
import { styles, Theme } from 'src/app/style/theme';
import { useAppState, useAppDispatch, favoritesCached, favoritesUpdated } from '../../context';
import { fetchFavoritesList, updateFavoritesList } from 'src/app/context/slices/user';
import { DetailedFilm } from './interfaces';
import { checkStatus } from 'src/utils';

export default function FilmPage() {
  const imgUrl = process.env.IMG_URL;

  const { favoritesCache, favoritesData, updated: statusCode } = useAppState(state => state.user);

  const dispatch = useAppDispatch();
  const filmData = useLoaderData() as DetailedFilm;

  const currentId = filmData.id;
  const foundFilm = favoritesCache.find(id => id === currentId);

  const userId = useAppState(state => state.user.id);

  const serverReturnedError = statusCode && !checkStatus(statusCode);

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
      if (serverReturnedError) toggleOn();
    }
    if (!foundFilm) {
      toggleOn();
      dispatch(updateFavoritesList({ id: currentId, favorite: true }));
      if (serverReturnedError) toggleOff();
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyles styles={styles}></GlobalStyles>
      <Theme>
        <AppBar position="fixed" sx={{ color: 'background.default' }}>
          <Toolbar>
            <Typography variant="h6" component="h6">
              {filmData.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box display="flex" p={1}>
          <Card sx={{ minWidth: '367px', mb: 2, mt: 6.5 }}>
            <CardMedia
              component="img"
              height="550"
              sx={{ objectFit: 'cover' }}
              image={`${imgUrl}${filmData.poster_path}`}
              alt={filmData.title}
            />
          </Card>
          <CardContent sx={{ maxWidth: '1000px', p: 10 }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography gutterBottom variant="h4" component="h4" pb={2} color={'primary.main'}>
                {filmData.title}
              </Typography>
              <Card style={{ color: 'supplement.main' }}>{filmData.vote_average.toFixed(1)}</Card>
              <CardActions sx={{ pb: 2 }}>
                {serverReturnedError ? (
                  <Card style={{ backgroundColor: 'supplement.main', color: 'white' }}>
                    Произошла ошибка при обновлении данных. Попробуйте повторить позднее.
                  </Card>
                ) : (
                  <IconButton aria-label="add to favorites" onClick={handleToggleFavorites}>
                    {foundFilm ? <StarIcon /> : <StarOutlineIcon />}
                  </IconButton>
                )}
              </CardActions>
            </Stack>
            <Typography variant="body1" component="p" fontSize={15} fontStyle={'oblique'} pb={2}>
              {filmData.overview}
            </Typography>
            <DetailedDescriptor data={filmData} />
            <Link to={'/'}>
              <Button variant="contained" sx={{ mt: 2, bgcolor: 'supplement.main' }}>
                На главную
              </Button>
            </Link>
          </CardContent>
        </Box>
      </Theme>
    </React.Fragment>
  );
}
