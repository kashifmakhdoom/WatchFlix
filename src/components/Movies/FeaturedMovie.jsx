import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const FeaturedMovie = ({ movie }) => {
  const theme = useTheme();
  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`/movie/${movie.id}`}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
        height: '300px',
        textDecoration: 'none',
      }}
    >
      <Card
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          media='picture'
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.575)',
            backgroundBlendMode: 'darken',
          }}
        />
        <Box sx={{ padding: '0px' }}>
          <CardContent
            sx={{
              color: '#fff',
              width: '40%',
              position: 'relative',
              backgroundColor: 'transparent',
              [theme.breakpoints.down('sm')]: { width: '100%' },
            }}
          >
            <Typography variant='h5' gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant='body'>{movie.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
