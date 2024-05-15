import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  Rating,
  Divider,
  Modal,
} from '@mui/material';

import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  Remove,
  ArrowBack,
  FavoriteBorderOutlined,
} from '@mui/icons-material';

import icons from '../../assets/icons';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from '../../services/TMDB';

import { MovieList } from '..';
import { userSelector } from '../../features/auth';

const MovieInfo = () => {
  const history = useNavigate();

  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({
    listName: 'favorite/movies',
    account_id: user.id,
    session_id: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: 'watchlist/movies',
    account_id: user.id,
    session_id: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({ movie_id: id, list: '/recommendations' });

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(
      !favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    // cannot use RTK query here because
    // react-hooks can only be used at global level.
    // thus, fallback to axios and manually update the TMDB
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: isMovieFavorited,
      }
    );

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    // cannot use RTK query here because
    // react-hooks can only be used at global level.
    // thus, fallback to axios and manually update the TMDB
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: isMovieWatchlisted,
      }
    );

    setIsMovieWatchlisted((prev) => !prev);
  };

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
        <Link to='/'>Something went wrong. Go to home!</Link>
      </Box>
    );
  }

  return (
    <Grid container>
      <Grid item sm={12} lg={4} justifyItems={'center'}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
          style={{
            borderRadius: '20px',
            boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
          }}
          width={'80%'}
        />
        &nbsp;&nbsp;
        <Button
          variant='contained'
          endIcon={<ArrowBack />}
          sx={{ borderColor: 'primary.main', width: '80%', mt: '20px' }}
          onClick={() => history(-1)}
        >
          <Typography
            style={{ textDecoration: 'none' }}
            color='inherit'
            variant='subtitle2'
          >
            Back
          </Typography>
        </Button>
      </Grid>
      <Grid item container direction={'column'} lg={7}>
        <Typography variant='h4' align='center' gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h6' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid
          item
          display='flex'
          justifyContent={'space-around'}
          sx={{ margin: '10px 0 !important', padding: '10px' }}
        >
          <Box display={'flex'} align='center'>
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant='subtitle1'
              gutterBottom
              sx={{ marginLeft: '10px' }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant='subtitle1' align='center' gutterBottom>
            {data?.runtime}min | Language: {data?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid
          item
          display={'flex'}
          flexWrap={'wrap'}
          justifyContent={'space-around'}
          sx={{ margin: '5px 0 !important' }}
        >
          <Typography variant='h6' align='center' gutterBottom>
            Genres:
          </Typography>
          {data?.genres?.map((genre, index) => (
            <Link
              key={index}
              to='/'
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              {/* <img
                src={icons[genre.name.toLowerCase()]}
                alt={genre.name}
                height='25'
                style={{
                  filter: "theme.palette.mode === 'dark' && 'invert(1)'",
                  marginRight: '10px',
                }}
              /> */}
              <Typography color='textPrimary' variant='subtitle1'>
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Divider />
        <Typography variant='h5' gutterBottom sx={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography sx={{ marginBottom: '2rem' }}>{data?.overview}</Typography>
        <Typography variant='h5' gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (character, index) =>
                  character.profile_path && (
                    <Grid
                      key={index}
                      item
                      xs={4}
                      md={4}
                      component={Link}
                      to={`/actor/${character.id}`}
                      sx={{ textDecoration: 'none' }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                        style={{
                          width: '100%',
                          maxWidth: '7em',
                          height: '8em',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
                      />
                      <Typography color='textPrimary'>
                        {character?.name}
                      </Typography>
                      <Typography color='textSecondary'>
                        {character.character.split('/')}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid
          item
          container
          style={{ marginTop: '2rem' }}
          justifyContent='center'
        >
          <div
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* Website, IMDB, Trailer */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <ButtonGroup size='small' variant='text'>
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button onClick={() => setOpen(true)} endIcon={<Theaters />}>
                  Trailer
                </Button>
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
              </ButtonGroup>
            </Grid>

            {/* Favorite, Watchlist, Back */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {/* <ButtonGroup size='small' variant='text'></ButtonGroup> */}
            </Grid>
          </div>
        </Grid>
      </Grid>
      {/* Recommended Movies*/}
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h4' align='center' gutterBottom>
          You might also like
        </Typography>
        {isRecommendationsFetching && (
          <Box display='flex' justifyContent='center'>
            <CircularProgress size='4rem' />
          </Box>
        )}
        {!isRecommendationsFetching &&
          (recommendations && recommendations?.results?.length ? (
            <MovieList movies={recommendations} count={10} />
          ) : (
            <Box>
              <Typography variant='h6' align='center'>
                Sorry, nothing was found.
              </Typography>
            </Box>
          ))}
      </Box>
      {/* Movie Trailer */}
      {data?.videos?.results?.length > 0 && (
        <Modal
          closeAfterTransition
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <iframe
            autoPlay
            frameBorder='0'
            title='Trailer'
            src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}?autoplay=1`}
            allow='autoplay'
            allowFullScreen
            style={{ width: '50%', height: '50%' }}
          />
        </Modal>
      )}
    </Grid>
  );
};

export default MovieInfo;
