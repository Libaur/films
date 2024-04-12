import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Typography } from '@mui/material';

export default function Welcome() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prevStep => (prevStep + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const messages = ['Добро пожаловать домой', 'Авторизуйтесь', 'И мы покажем ваши любимые фильмы'];

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <Typography variant="h3" align="center" color="primary">
            {messages[step]}
          </Typography>
        </motion.div>
      </Grid>
    </Grid>
  );
}
