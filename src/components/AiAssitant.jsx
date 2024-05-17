import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchToken, createSessionId, moviesApi } from '../utils';
import {
  selectGenreOrCategory,
  searchMovie,
} from '../features/currentGenreOrCategory';

import alanBtn from '@alan-ai/alan-sdk-web';
import { ThemeModeContext } from '../utils/ToggleThemeMode';
import { genreOrCategory } from './../features/currentGenreOrCategory';

const useAiAssistant = () => {
  const { setMode } = useContext(ThemeModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_AI_ALAN_KEY,
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          if (foundGenre) {
            navigate('/');
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith('top')
              ? 'top_rated'
              : genreOrCategory;

            navigate('/');
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'login' || command === 'signin') {
          fetchToken();
        } else if (command === 'logout' || command === 'signout') {
          localStorage.clear();
          window.location.href = '/';
        }
      },
    });
  }, []);
};

export default useAiAssistant;
