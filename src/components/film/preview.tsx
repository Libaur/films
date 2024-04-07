import React, { memo } from 'react';
import { Card, CardMedia } from '@mui/material';

interface Preview {
  onClick: () => void;
  image: string;
  title: string;
}

export const Preview = memo(function CardPreview({ onClick, image, title }: Preview) {
  return (
    <Card onClick={onClick}>
      <CardMedia
        component="img"
        alt={`Image ${title}`}
        image={image}
        title={title}
        height={'280px'}
        sx={{ objectFit: 'fill' }}
      />
    </Card>
  );
});
