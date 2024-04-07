import React from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

export default function LoadingPage() {
  return (
    <Backdrop open={true} sx={{ backgroundColor: '#E2E1E9' }}>
      <CircularProgress color="secondary" sx={{ mr: 2 }} />
      <Typography variant="h6" mt={2} color="#A8677E">
        Загрузка...
      </Typography>
    </Backdrop>
  );
}
