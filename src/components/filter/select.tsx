import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useAppState, useAppDispatch, optionSelected } from 'src/app/context';

export default function NativeFilterSelect() {
  const dispatch = useAppDispatch();
  const { option: currentOption, selectData } = useAppState(state => state.filter);

  return (
    <Box pl={2.5} pr={2.5} pt={0.5}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Сортировать по:
        </InputLabel>
        <NativeSelect
          value={currentOption}
          onChange={e => dispatch(optionSelected(e.target.selectedIndex + 1))}
          color="primary"
        >
          {selectData.map(option => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
