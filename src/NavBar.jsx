import { useState } from 'react';

import {
  Pets,
  Mail,
  Notifications,
  Key,
  Person,
  ManageAccounts,
  Logout,
} from '@mui/icons-material';

import {
  styled,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Search = styled('div')(({ theme }) => ({
  background: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
}));

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
        <Search>
          <InputBase
            placeholder='search...'
            sx={{ color: 'gray', width: '100%' }}
          />
        </Search>

        {!isAuthenticated ? (
          <IconButton aria-label='login' color='inherit' onClick={() => {}}>
            <Key />
          </IconButton>
        ) : (
          <>
            <Icons>
              <Badge badgeContent={4} color='error'>
                <Mail />
              </Badge>
              <Badge badgeContent={3} color='error'>
                <Notifications />
              </Badge>
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
