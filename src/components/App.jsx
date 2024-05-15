import { React, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { Box, Stack, createTheme } from '@mui/material';

import NavBar from './NavBar';
import SideBar from './SideBar';

import { Movies, MovieInfo, Actor, Profile, MyList } from './index';

const App = () => {
  const [mode, setMode] = useState('light');
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <NavBar />
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        <SideBar />
        <Box flex={5} alignItems={'center'} p={5}>
          <main style={{ width: '100%' }}>
            <Routes>
              <Route exact path='/' element={<Movies />}></Route>
              <Route exact path='/movie/:id' element={<MovieInfo />}></Route>
              <Route exact path='/actor/:id' element={<Actor />}></Route>
              <Route exact path='/profile/:id' element={<Profile />}></Route>
              <Route exact path='/list/:id' element={<MyList />}></Route>
            </Routes>
          </main>
        </Box>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
