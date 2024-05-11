import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '..';

import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isLoading } = useGetMoviesQuery({
    genreIdOrCategoryName,
    searchQuery,
    page,
  });

  if (isLoading) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
        <CircularProgress size={'4rem'} />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display={'flex'} alignItems={'center'} mt={'20px'}>
        <Typography variant={'h4'}>
          No movies matches the name.
          <br />
          Please retry something else.
        </Typography>
      </Box>
    );
  }

  if (error) return 'An error has occured.';

  // log -> movies
  //console.log(data);

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
