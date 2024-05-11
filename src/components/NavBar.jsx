import React, { useState } from 'react';

import { Pets, Key, Person, ManageAccounts, Logout } from '@mui/icons-material';

import {
  Box,
  styled,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';

import SearchBox from './SearchBox';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  gap: '20px',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const isAuthenticated = false;
  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <img src='logo-white.png' alt='logo' height={'40px'} width={'100px'} />
        {/*<Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>
          MovieFlix
        </Typography>*/}
        <Pets sx={{ display: { xs: 'block', sm: 'none' } }} />
        <SearchBox placeholder='search...' />

        {!isAuthenticated ? (
          <IconButton aria-label='login' color='inherit' onClick={() => {}}>
            <Key />
          </IconButton>
        ) : (
          <>
            <Icons>
              {/* <Badge badgeContent={4} color='error'>
                <Mail />
              </Badge>
              <Badge badgeContent={3} color='error'>
                <Notifications />
              </Badge> */}
              <Avatar
                sx={{ width: 35, height: 35 }}
                onClick={(e) => setOpen(true)}
              >
                KM
              </Avatar>
            </Icons>
            <UserBox onClick={(e) => setOpen(true)}>
              <Avatar sx={{ width: 35, height: 35 }}>KM</Avatar>
              <Typography variant='span'>Max</Typography>
            </UserBox>
          </>
        )}
      </StyledToolbar>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>
          <Person />
          &nbsp;Profile
        </MenuItem>
        <MenuItem>
          <ManageAccounts />
          &nbsp;My Account
        </MenuItem>
        <MenuItem>
          <Logout />
          &nbsp;Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
