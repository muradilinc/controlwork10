import React from 'react';
import { Paper, Typography } from '@mui/material';
import {Comment} from '../../types';

interface Props {
  comment: Comment;
}

const CommentsItem: React.FC<Props> = ({comment}) => {
  return (
    <Paper sx={{
      margin: '10px 0',
      display: 'flex',
      padding: '15px',
      gap: '0 10px',
      alignItems: 'center',
    }}>
      <Typography variant="h4">
        {comment.author}
      </Typography>
      <Typography variant="body1">
        {comment.text}
      </Typography>
    </Paper>
  );
};

export default CommentsItem;