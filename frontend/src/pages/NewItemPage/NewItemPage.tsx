import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleNews } from '../../store/news/newsThunk';
import { selectSingleNews } from '../../store/news/newsSlice';
import { Box, Button, TextField, Typography } from '@mui/material';
import Spinner from '../../components/Spinner/Spinner';
import dayjs from 'dayjs';
import { BASE_URL } from '../../constants/constants';
import { createComment, getComments } from '../../store/comments/commentsThunk';
import { selectComments } from '../../store/comments/commentsSlice';
import CommentsItem from '../../components/commentsItem/commentsItem';
import { NewCommentState } from '../../types';

const NewItemPage = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const newsItem = useAppSelector(selectSingleNews);
  const comments = useAppSelector(selectComments);
  const [comment, setComment] = useState<NewCommentState>({
    author: null,
    text: '',
  });

  useEffect(() => {
    dispatch(getSingleNews(parseInt(id)));
    dispatch(getComments(parseInt(id)));
  }, [dispatch, id]);

  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setComment(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!newsItem) {
    return <Spinner/>;
  }

  const addComment = async (event: FormEvent) => {
    event.preventDefault();
    const newComment = {
      ...comment,
      newsId: newsItem.id
    };
    await dispatch(createComment(newComment));
    await dispatch(getComments(parseInt(id)));
    setComment({
      author: '',
      text: '',
    });
  };

  return (
    <Box sx={{
      margin: "30px 0",
      display: 'flex',
      flexDirection: 'column',
      gap: '10px 0',
    }}>
      <Typography variant="h4">
        {newsItem.title}
      </Typography>
      <Typography variant="body1">
        {dayjs(newsItem.createdAt).format('DD.MM.YYYY HH:MM:SSS')}
      </Typography>
      <Typography variant="body2">
        {newsItem.description}
      </Typography>
      <img src={BASE_URL + '/' + newsItem.image} alt="image"/>
      <Box>
        <Typography variant="h4">
          Comments ({comments.length})
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px 0',
        }}>
          {
            comments.map(comment =>
              <CommentsItem key={comment.id} comment={comment} idItem={parseInt(id)}/>
            )
          }
        </Box>
        <Box>
          <form onSubmit={addComment}>
            <Typography variant="h2">Add comment</Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px 0',
            }}>
              <Box>
                <Typography>Name</Typography>
                <TextField sx={{width: '100%'}} name="author" value={comment.author} onChange={changeInput}  type="text"/>
              </Box>
              <Box>
                <Typography>Comment</Typography>
                <TextField sx={{width: '100%'}} multiline rows={4} name="text" value={comment.text} onChange={changeInput} type="text"/>
              </Box>
              <Button type="submit" variant="outlined">Add</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default NewItemPage;