import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import { FeaturedMovie, MovieList } from '..';

import { Box, CircularProgress, Typography, Pagination } from '@mui/material';

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

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} />
      <Box display={'flex'} justifyContent={'center'} mt={5}>
        <Pagination
          color='secondary'
          variant='outlined'
          shape='rounded'
          sx={{ alignItems: 'center' }}
          defaultPage={1}
          page={page}
          count={data?.total_pages}
          onChange={(e, value) => setPage(value)}
        />
        {/* <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data?.total_pages}
      /> */}
      </Box>
    </div>
  );
};

export default Movies;
