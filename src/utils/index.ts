import { useState, useEffect } from 'react';
import { Film, Genre } from '../app/shared-contracts';

const formattingDate = (dateStamp: string) => {
  const date = new Date(dateStamp);
  return new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
};

const defineDisplayedContent = ({
  byFame,
  bySearch,
  byYears,
  byGenres,
  genres,
}: {
  byFame: Film[];
  bySearch: Film[];
  byYears: Film[];
  byGenres: Film[];
  genres: Genre[];
}) => {
  let displayedContent: Film[] = [];
  if (byFame.length && bySearch.length) displayedContent = bySearch;
  if (byFame.length && !bySearch.length) displayedContent = byYears;
  if (byFame.length && !byYears.length && !bySearch.length) displayedContent = byGenres;
  if (!byYears.length && !bySearch.length && !genres.length) displayedContent = byFame;
  return displayedContent;
};

const checkStatus = (status: number) => (status >= 200 && status < 300 ? true : false);

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const jwtPattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;

export {
  formattingDate,
  useDebounce,
  defineDisplayedContent,
  checkStatus,
  emailPattern,
  jwtPattern,
};
