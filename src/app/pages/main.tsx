import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Welcome from '../../components/welcome';
import Gallery from 'src/components/gallery';
import Header from 'src/components/header';
import Filter from 'src/components/filter';
import AuthDialog from 'src/components/auth-dialog';
import NativeFilterSelect from 'src/components/filter/select';
import Years from 'src/components/filter/years';
import Genres from 'src/components/filter/genres';
import { Main, DrawerHeader } from 'src/app/style/shared-styled';
import { styles, Theme } from '../style/theme';
import { useAppState, useAppDispatch } from '../context';
import { AuthDialogContent } from 'src/components/auth-dialog/interfaces';
import { fetchFilterData } from '../context/slices/filter/requests';

interface MainPage {
  enterEmail: AuthDialogContent;
  enterToken: AuthDialogContent;
}

export default function MainPage(props: MainPage) {
  const { enterEmail, enterToken } = props;

  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isTokenModalOpen, setTokenModalOpen] = useState(false);

  const { page: currentPage } = useAppState(state => state.filter);

  const userId = useAppState(state => state.user.id);
  const dispatch = useAppDispatch();

  const auth = userId;

  useEffect(() => {
    if (auth) {
      dispatch(fetchFilterData({ page: currentPage }));
    }
  }, [auth, currentPage]);

  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyles styles={styles}></GlobalStyles>
      <Theme>
        <Header
          isFilterOpen={isFilterOpen}
          handleFilterOpen={() => setFilterOpen(true)}
          handleModalOpen={() => setEmailModalOpen(true)}
          auth={auth}
        />
        <AuthDialog
          content={enterEmail}
          isModalOpen={isEmailModalOpen}
          handleModalClose={() => setEmailModalOpen(false)}
          nextModalOpen={() => setTokenModalOpen(true)}
        />
        <AuthDialog
          content={enterToken}
          isModalOpen={isTokenModalOpen}
          handleModalClose={() => setTokenModalOpen(false)}
        />
        {!auth ? (
          <>
            <Welcome />
            <Toaster />
          </>
        ) : (
          <>
            <Filter isFilterOpen={isFilterOpen} handleFilterClose={() => setFilterOpen(false)}>
              <NativeFilterSelect />
              <Years />
              <Genres />
            </Filter>
            <Main open={isFilterOpen}>
              <DrawerHeader />
              <Gallery />
            </Main>
            <Toaster />
          </>
        )}
      </Theme>
    </React.Fragment>
  );
}
