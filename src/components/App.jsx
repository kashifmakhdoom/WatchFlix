// Core
import { React, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';

// MUI
import { Box, Stack } from '@mui/material';

// Layout
import NavBar from './NavBar';
import SideBar from './SideBar';

// Components
import { Movies, MovieInfo, Actor, Profile, MyList } from './index';
import { useTheme } from '@mui/material/styles';

//
import useAiAssistant from './AiAssitant';

const App = () => {
  const theme = useTheme();

  const aiAssistantBtnContainer = useRef();
  useAiAssistant();

  return (
    <>
      <NavBar />
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        <SideBar />
        <Box
          flex={5}
          alignItems={'center'}
          p={5}
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '',
            margin: '0 !important',
          }}
        >
          <main style={{ width: '100%' }}>
            <Routes>
              <Route exact path='/' element={<Movies />}></Route>
              <Route exact path='/movie/:id' element={<MovieInfo />}></Route>
              <Route exact path='/actor/:id' element={<Actor />}></Route>
              <Route exact path='/profile/:id' element={<Profile />}></Route>
              <Route exact path='/list/:id' element={<MyList />}></Route>
            </Routes>
          </main>
          <div ref={aiAssistantBtnContainer} />
        </Box>
      </Stack>
    </>
  );
};

export default App;
