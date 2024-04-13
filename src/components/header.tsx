import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import { AppBar } from '../app/style/shared-styled';

interface Header {
  isFilterOpen: boolean;
  handleFilterOpen: () => void;
  handleModalOpen: () => void;
  auth: number | null;
}

export default function Header({ isFilterOpen, handleFilterOpen, handleModalOpen, auth }: Header) {
  return (
    <AppBar position="fixed" open={isFilterOpen} sx={{ color: 'background.default' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={auth ? handleFilterOpen : undefined}
          edge="start"
          sx={{ mr: 2, ...(isFilterOpen && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Фильмы
        </Typography>
        {auth ? (
          <IconButton color="inherit" sx={{ ml: 'auto' }}>
            <AccountBoxIcon />
          </IconButton>
        ) : (
          <Button onClick={handleModalOpen} color="inherit" sx={{ ml: 'auto' }}>
            войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
