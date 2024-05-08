import React from 'react';
import { Box } from '@mui/material';
import { Movies } from './index';

const Content = () => {
  return (
    <>
      <Box flex={5} alignItems={'center'} p={5}>
        <Movies />
      </Box>
    </>
  );
};

export default Content;
