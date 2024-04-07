import React from 'react';
import Typography from '@mui/material/Typography';
import { DetailedFilm } from 'src/app/pages/film/interfaces';
import { formattingDate } from 'src/utils';

export default function DetailedDescriptor({ data }: { data: DetailedFilm }) {
  const main = '#637878';
  const descItems = [
    { title: 'Дата релиза:', description: `${formattingDate(data.release_date)}` },
    { title: 'Время просмотра:', description: `${data.runtime?.toString()}` },
    { title: 'Жанр:', description: `${data.genres.map(genre => genre.name).join(', ')}` },
    {
      title: 'Производство:',
      description: `${data.production_companies.map(company => company.name).join(', ')}`,
    },
    {
      title: 'Страна:',
      description: `${data.production_countries.map(country => country.name).join(', ')}`,
    },
    {
      title: 'Язык:',
      description: `${data.spoken_languages.map(language => language.name).join(', ')}`,
    },
  ];

  return descItems.map(item => (
    <Typography key={item.title} variant="subtitle1" component="p" pb={0.5}>
      <b color={main}>{item.title}</b> {item.description}
    </Typography>
  ));
}
