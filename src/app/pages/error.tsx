import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const navigate = useNavigate();

  const handleGoBack = () => (window.history.length > 1 ? window.history.back() : navigate('/'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f7f7f7"
      p={2}
    >
      <ErrorOutlineIcon fontSize="large" color="error" />
      <Typography variant="h4" component="h1" gutterBottom>
        Ой!
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        К сожалению, произошла непредвиденная ошибка
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleGoBack}>
        Вернуться
      </Button>
    </Box>
  );
}
