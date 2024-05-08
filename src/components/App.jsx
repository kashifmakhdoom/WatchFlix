import { React, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { Box, Stack, createTheme } from '@mui/material';

import NavBar from '../NavBar';
import { Movies, MovieInfo, Actors, Profile } from './index';
import SideBar from './SideBar';
import Content from './Content';

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
        <Content />
      </Stack>

      <Routes>
        {/*<Route exact path='/' element={<Movies />}></Route>*/}
        <Route exact path='/movies/:id' element={<MovieInfo />}></Route>
        <Route exact path='/actors/:id' element={<Actors />}></Route>
        <Route exact path='/profile/:id' element={<Profile />}></Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
