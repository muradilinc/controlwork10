import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import {Comment} from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { deleteComment, getComments } from '../../store/comments/commentsThunk';

interface Props {
  comment: Comment;
  idItem: number;
}

const CommentsItem: React.FC<Props> = ({comment, idItem}) => {
  const dispatch = useAppDispatch();

  const deleteHandle = async (id: number) => {
    await dispatch(deleteComment(id));
    await dispatch(getComments(idItem));
  };

  return (
    <Paper sx={{
      margin: '10px 0',
      display: 'flex',
      padding: '15px',
      justifyContent: 'space-between',
      gap: '0 10px',
      alignItems: 'center',
    }}>
      <Typography variant="h4">
        {comment.author}
      </Typography>
      <Typography variant="body1">
        {comment.text}
      </Typography>
      <Button variant="outlined" color="error" onClick={() => deleteHandle(comment.id)}>delete</Button>
    </Paper>
  );
};

export default CommentsItem;