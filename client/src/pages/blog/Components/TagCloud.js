import React from 'react';
import { Chip, Box } from '@mui/material';

const TagCloud = ({ tags }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      {tags.map((tag, index) => (
        <Chip key={index} label={tag} />
      ))}
    </Box>
  );
};

export default TagCloud;
