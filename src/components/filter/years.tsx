import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useAppState, useAppDispatch, yearsSelected } from 'src/app/context';
import { fetchSortedByYearsFilms } from 'src/app/context/slices/filter/requests';
import { useDebounce } from 'src/utils';

export default function Years() {
  const dispatch = useAppDispatch();
  const { page: currentPage, years: currentYears } = useAppState(state => state.filter);
  const smallerYear = useDebounce(currentYears[0].toString());
  const largerYear = useDebounce(currentYears[1].toString());

  useEffect(() => {
    if (smallerYear !== largerYear) {
      dispatch(
        fetchSortedByYearsFilms({
          smaller: smallerYear,
          larger: largerYear,
          page: currentPage,
        })
      );
    }
  }, [smallerYear, largerYear, currentPage]);

  const valuetext = (value: number) => `${value}`;

  return (
    <Box pl={3.5} pr={3.5} pt={6.5} pb={2.5}>
      <Slider
        getAriaLabel={() => 'Год релиза'}
        value={currentYears}
        onChange={(event, yearsRange) => dispatch(yearsSelected(yearsRange))}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        step={1}
        min={1975}
        max={2024}
      />
    </Box>
  );
}
