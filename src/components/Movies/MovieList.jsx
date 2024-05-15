import React from 'react';
import { Grid } from '@mui/material';
import { Movie } from '..';

const MovieList = ({ movies, count }) => {
  return (
    <Grid
      rowSpacing={2}
      columnSpacing={1}
      container
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        overflow: 'auto',
        textAlign: 'center',
        margin: 0,
        padding: 0,
      }}
    >
      {movies.results?.map((movie, index) => (
        <Movie movie={movie} key={index} index={index} />
      ))}
      {/* {movies.results.slice(0, count).map((movie, index) => (
        <Movie movie={movie} key={index} index={index} />
      ))} */}
    </Grid>
  );
};

export default MovieList;
