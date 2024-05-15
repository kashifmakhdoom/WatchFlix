import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Divider } from '@mui/material';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  console.log(user);

  return (
    <Box>
      <Box display='flex' justifyContent={'space-between'}>
        <Typography variant='h4' gutterBottom>
          My Profile
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
};

export default Profile;
