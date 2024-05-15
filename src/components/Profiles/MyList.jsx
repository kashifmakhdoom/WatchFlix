import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Divider } from '@mui/material';

import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../Rated/RatedCards';

const MyList = () => {
  const { user } = useSelector((state) => state.user);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite/movies',
    account_id: user.id,
    session_id: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: 'watchlist/movies',
      account_id: user.id,
      session_id: localStorage.getItem('session_id'),
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  return (
    <Box>
      <Box display='flex' justifyContent={'space-between'}>
        <Typography variant='h4' gutterBottom>
          My List
        </Typography>
      </Box>
      <Divider />
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant='h5'>
          Add your favorite or watchlist movies here!
        </Typography>
      ) : (
        <Box mt={5}>
          <RatedCards title='Favorite Movies' data={favoriteMovies} />
          <RatedCards title='Watchlist Movies' data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default MyList;
