import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Pagination,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import {
  useGetActorDetailQuery,
  useGetMoviesByActorQuery,
} from '../../services/TMDB';

import MovieList from '../Movies/MovieList';

const Actor = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetActorDetailQuery(id);
  const { data: actorMovieList, isLoading: isActorMovieListLoading } =
    useGetMoviesByActorQuery({ actor_id: id, page });

  const history = useNavigate();

  if (isLoading) {
    return (
      <Box display='flex' justifyContent={'space-between'}>
        <CircularProgress size={'8rem'} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display='flex' justifyContent={'space-between'}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => history(-1)}
          color='primary'
        >
          Go back!
        </Button>
      </Box>
    );
  }

  const handleOnPageChange = (e, value) => {
    setPage(value);
  };


  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            style={{
              borderRadius: '20px',
              boxShadow: '0.5em 0.5em 1em',
              objectFit: 'cover',
              maxWidth: '90%',
            }}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant='h2' gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant='h5' gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant='body1' align='justify' paragraph>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box marginTop='2rem' display='flex' justifyContent='space-around'>
            <Button
              variant='contained'
              color='primary'
              target='_blank'
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => history(-1)}
              color='primary'
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin='2rem 0'>
        <Typography variant='h2' align='center' gutterBottom>
          Movies
        </Typography>
        {isActorMovieListLoading && (
          <Box display='flex' justifyContent='center'>
            <CircularProgress size='4rem' />
          </Box>
        )}
        {!isActorMovieListLoading &&
          (actorMovieList && actorMovieList?.results?.length ? (
            <>
              <MovieList movies={actorMovieList} count={10} />
              <Box display={'flex'} justifyContent={'center'} mt={5}>
                <Pagination
                  color='secondary'
                  variant='outlined'
                  shape='rounded'
                  sx={{ alignItems: 'center' }}
                  defaultPage={1}
                  page={page}
                  count={actorMovieList?.total_pages}
                  onChange={handleOnPageChange}
                />
              </Box>
            </>
          ) : (
            <Box>
              <Typography variant='h6' align='center'>
                Sorry, nothing was found.
              </Typography>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default Actor;
