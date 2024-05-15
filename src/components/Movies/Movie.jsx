import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';

const Movie = ({ movie, index }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grow in key={index} timeout={(index + 1) * 250}>
        <div>
          <Link
            to={`/movie/${movie.id}`}
            sx={{
              alignItems: 'center',
              fontWeight: 'bolder',
            }}
          >
            <img
              style={{
                borderRadius: '20px',
                height: '300px',
                '&:hover': {
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transform: "scale('2.0')",
                },
              }}
              alt={movie.title}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : `https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg`
              }
            />
          </Link>
          <Typography variant={'h6'} sx={{ fontWeight: '400' }}>
            {movie.title}
          </Typography>
          <Tooltip
            disableTouchListener
            title={`${(movie.vote_average / 2).toFixed(1)} / 5`}
          >
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.5} />
            </div>
          </Tooltip>
        </div>
      </Grow>
    </Grid>
  );
};

export default Movie;
