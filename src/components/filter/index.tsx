import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerHeader, filtersDrawerStyle, paginationStyle } from '../../app/style/shared-styled';
import { useTheme } from '@mui/material/styles';
import { useAppState, useAppDispatch, pageSelected, filtersReset } from 'src/app/context';
import { fetchSearchedFilm } from 'src/app/context/slices/filter/requests';
import { useDebounce } from 'src/utils';

interface Filter {
  isFilterOpen: boolean;
  handleFilterClose: () => void;
  children: React.ReactNode;
}

export default function Filter({ isFilterOpen, handleFilterClose, children }: Filter) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const theme = useTheme();
  const { page: currentPage } = useAppState(state => state.filter);
  const dispatch = useAppDispatch();

  const resetFilters = () => {
    dispatch(filtersReset());
    setQuery('');
  };

  useEffect(() => {
    if (debouncedQuery.length)
      dispatch(fetchSearchedFilm({ query: debouncedQuery, page: currentPage }));
  }, [debouncedQuery, currentPage]);

  return (
    <Drawer sx={filtersDrawerStyle} variant="persistent" anchor="left" open={isFilterOpen}>
      <DrawerHeader>
        <Button
          onClick={resetFilters}
          sx={{ overflow: 'auto', width: '100%', color: 'supplement.main' }}
        >
          Сбросить фильтры
        </Button>
        <IconButton onClick={handleFilterClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <TextField
        value={query}
        onChange={e => setQuery(e.target.value)}
        size="small"
        margin="normal"
        placeholder="Название фильма"
        sx={{ pl: 2.5, pr: 2.5 }}
      />
      <div style={{ flexGrow: 1 }}>{children}</div>
      <Divider />
      <Pagination
        size="small"
        color="primary"
        count={500}
        page={currentPage}
        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
          dispatch(pageSelected(value))
        }
        sx={paginationStyle}
      />
    </Drawer>
  );
}
