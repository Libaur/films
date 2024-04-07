import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Gallery from 'src/components/gallery';
import Header from 'src/components/header';
import Filter from 'src/components/filter';
import AuthDialog from 'src/components/auth-dialog';
import NativeFilterSelect from 'src/components/filter/select';
import Years from 'src/components/filter/years';
import Genres from 'src/components/filter/genres';
import { AppState, AppDispatch } from '../context';
import { Option } from 'src/app/shared-contracts';
import { AuthDialogContent } from 'src/components/auth-dialog/interfaces';
import { fetchFilterData } from '../context/slices/filter/requests';
import { styles, Theme } from '../style/theme';
import { Main, DrawerHeader } from 'src/app/style/shared-styled';

interface MainPage {
  options: Option[];
  enterEmail: AuthDialogContent;
  enterToken: AuthDialogContent;
}

export default function MainPage(props: MainPage) {
  const { options, enterEmail, enterToken } = props;

  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isTokenModalOpen, setTokenModalOpen] = useState(false);

  const currentPage = useSelector((state: AppState) => state.filter.page);
  const genres = useSelector((state: AppState) => state.filter.genresData);

  const stateId = useSelector((state: AppState) => state.user.id);
  const dispatch = useDispatch<AppDispatch>();

  const auth = stateId ?? Number(Cookies.get('userId'));

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
        <Filter isFilterOpen={isFilterOpen} handleFilterClose={() => setFilterOpen(false)}>
          <NativeFilterSelect options={options} />
          <Years />
          <Genres content={genres} />
        </Filter>
        <Main open={isFilterOpen}>
          <DrawerHeader />
          <Gallery />
        </Main>
      </Theme>
    </React.Fragment>
  );
}
