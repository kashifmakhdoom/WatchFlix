// Core
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// MUI
import { useTheme } from '@mui/material/styles';
import { Key, Person, Logout, Slideshow } from '@mui/icons-material';
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
  Switch,
  FormControlLabel,
} from '@mui/material';

import { ThemeModeContext } from '../utils/ToggleThemeMode';

// Layout
import SearchBox from './SearchBox';

import { fetchToken, createSessionId, moviesApi } from '../utils';
import { setUser, userSelector } from '../features/auth';

import logo_white from '../assets/logos/logo-white.png';
import logo_red from '../assets/logos/logo-red.png';

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

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
  const theme = useTheme();

  const logo = theme.palette.mode === 'dark' ? logo_red : logo_white;
  const { isAuthenticated, user } = useSelector(userSelector);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const themeMode = useContext(ThemeModeContext);

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `account?session_id=${sessionIdFromLocalStorage}`
          );

          dispatch(setUser(userData));
        } else {
          console.log(2);
          const sessionId = await createSessionId();

          const { data: userData } = await moviesApi.get(
            `account?session_id=${sessionId}`
          );

          dispatch(setUser(userData));
        }
      }
    };

    loginUser();
  }, [token]);

  const onProfileClick = () => {
    setOpen(false);
    navigate(`/profile/${user.id}`);
  };

  const onMyListClick = () => {
    setOpen(false);
    navigate(`/list/${user.id}`);
  };

  const onLogoutClick = () => {
    setOpen(false);
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Link to={'/'}>
          <img src={logo} alt='logo' height={'40px'} width={'100px'} />
        </Link>
        {/*<Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>
          WatchFlix
        </Typography>*/}
        <Slideshow sx={{ display: { xs: 'block', sm: 'none' } }} />
        <SearchBox placeholder='Search movies...' />
        <FormControlLabel
          control={<StyledSwitch sx={{ m: 1 }} />}
          label=''
          justifyContent={'end'}
          onChange={themeMode.toggleThemeMode}
        />
        {!isAuthenticated ? (
          <IconButton aria-label='login' color='inherit' onClick={fetchToken}>
            <Key />
          </IconButton>
        ) : (
          <>
            <Icons>
              {/*<IconButton to={`/profile/${user.id}`}>
                <AccountCircle />
              </IconButton>*/}
              <Avatar
                src={
                  user?.avatar?.tmdb?.avatar_path
                    ? `https://www.themovedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`
                    : `https://gravatar.com/avatar/${user?.avatar?.gravatar?.hash}`
                }
                sx={{ width: 40, height: 40 }}
                onClick={(e) => setOpen(true)}
              />
            </Icons>
            <UserBox onClick={(e) => setOpen(true)}>
              <Avatar sx={{ width: 35, height: 35 }}>KM</Avatar>
              <Typography variant='span'>Max</Typography>
            </UserBox>
          </>
        )}
      </StyledToolbar>
      <Menu
        id='positioned-menu'
        aria-labelledby='positioned-button'
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
        <MenuItem onClick={onProfileClick}>
          <Person />
          &nbsp;My Profile
        </MenuItem>
        <MenuItem onClick={onMyListClick}>
          <Slideshow />
          &nbsp;My Movies
        </MenuItem>
        <MenuItem onClick={onLogoutClick}>
          <Logout />
          &nbsp;Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
