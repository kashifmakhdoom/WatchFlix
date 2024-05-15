import { Button, Typography } from '@mui/material';
import React from 'react';

function Pagination({ currentPage, setPage, totalPages }) {
  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1);
  };
  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (totalPages === 0) return null;
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}
    >
      <Button
        disabled={currentPage === 1}
        onClick={handlePrev}
        variant='contained'
        color='primary'
        type='button'
        sx={{ margin: '30px 2px' }}
      >
        Prev
      </Button>
      <Typography
        variant='h6'
        sx={{
          margin: '0 20px !important',
          color: 'theme.palette.text.primary',
        }}
      >
        {currentPage}
      </Typography>
      <Button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        variant='contained'
        color='primary'
        type='button'
        sx={{ margin: '30px 2px' }}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
