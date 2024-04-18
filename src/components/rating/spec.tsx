import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilmRating from '.';

let value: number | null = null;
const setValue = (newValue: number | null) => (value = newValue);
const handleChange = (newValue: number | null) => setValue(newValue);

test('loads and not displays rating', () => {
  const { getByLabelText } = render(
    <FilmRating size="medium" starsCount={value} handleChange={handleChange} disabled={false} />
  );
  const firstStar = getByLabelText('1 Star');

  expect(firstStar).not.toHaveClass('MuiRating-iconFilled');
});

test('rating changes correct', () => {
  const { getByLabelText: ratesFilm } = render(
    <FilmRating size="medium" starsCount={value} handleChange={handleChange} disabled={false} />
  );

  fireEvent.click(ratesFilm('5 Stars'));

  expect(value).toBe(5);
});
