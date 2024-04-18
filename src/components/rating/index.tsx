import React from 'react';
import Rating from '@mui/material/Rating';

interface FilmRating {
  size: 'small' | 'medium' | 'large';
  starsCount: number | null;
  handleChange?: (value: number | null) => void;
  disabled: boolean;
}

export default function FilmRating({ size, starsCount, handleChange, disabled }: FilmRating) {
  return (
    <Rating
      size={size}
      name="film-rating"
      value={starsCount}
      onChange={(event, newValue) => (handleChange ? handleChange(newValue) : undefined)}
      disabled={disabled}
    />
  );
}
