import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { InputBase, styled } from '@mui/material';

import { searchMovie } from '../features/currentGenreOrCategory';

const StyledSearch = styled('div')(({ theme }) => ({
  display: 'block',
  background: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '200%',
}));

const SearchBox = ({ placeholder }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  // do not show search box other than main movies page
  if(location.pathname !== '/') return null;

  return (
    <div>
      <StyledSearch>
        <InputBase
          onKeyPress={handleKeyPress}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder={placeholder}
          sx={{ color: 'gray', width: '100%' }}
        />
      </StyledSearch>
    </div>
  );
};

export default SearchBox;
