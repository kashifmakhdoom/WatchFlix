import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import {
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
  Divider,
  Typography,
  CircularProgress,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import icons from '../assets/icons';

import { useGetGenresQuery } from '../services/TMDB';
import { selectGenreOrCategory } from '../features/currentGenreOrCategory';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const SideBar = () => {
  const theme = useTheme();

  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isLoading } = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    // todo:
  }, [genreIdOrCategoryName]);

  return (
    <Box
      flex={1}
      p={2}
      sx={{
        backgroundColor:
          theme.palette.mode === 'dark' ? '#757575' : 'lightblue',
        display: { xs: 'none', sm: 'block' },
      }}
    >
      <Box
        sx={{
          overflow: 'auto',
          padding: 0,
          margin: 0,
        }}
      >
        <List>
          <ListSubheader
            sx={{
              backgroundColor: 'inherit',
              color: theme.palette.mode === 'dark' ? '#FFF' : '',
            }}
          >
            <Typography variant='h6'>Categories</Typography>
          </ListSubheader>
          {categories.map(({ label, value }) => (
            <Link
              key={value}
              to={'/'}
              sx={{
                textDecoration: 'none',
                color: theme.palette.mode === 'dark' ? '#FFF' : 'black',
              }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => dispatch(selectGenreOrCategory(value))}
                >
                  <ListItemIcon to={`/`}>
                    <img
                      src={icons[label.toLowerCase()]}
                      alt={label}
                      height='27'
                      style={{
                        filter:
                          theme.palette.mode === 'dark' ? 'invert(1)' : '',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader
            sx={{
              backgroundColor: 'inherit',
              color: theme.palette.mode === 'dark' ? '#FFF' : '',
            }}
          >
            <Typography variant='h6'>Genres</Typography>
          </ListSubheader>
          {isLoading ? (
            <Box display={'flex'} justifyContent={'center'}>
              <CircularProgress />
            </Box>
          ) : (
            data.genres.map(({ id, name }) => (
              <Link
                key={id}
                to={'/'}
                sx={{
                  textDecoration: 'none',
                  color: theme.palette.mode === 'dark' ? '#FFF' : 'black',
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => dispatch(selectGenreOrCategory(id))}
                  >
                    <ListItemIcon>
                      <img
                        src={icons[name.toLowerCase()]}
                        alt={name}
                        height='27'
                        style={{
                          filter:
                            theme.palette.mode === 'dark' ? 'invert(1)' : '',
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          )}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
