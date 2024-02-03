import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleNews } from '../../store/news/newsThunk';
import { selectSingleNews } from '../../store/news/newsSlice';
import { Box, Paper, TextField, Typography } from '@mui/material';
import Spinner from '../../components/Spinner/Spinner';
import dayjs from 'dayjs';
import { BASE_URL } from '../../constants/constants';
import { getComments } from '../../store/comments/commentsThunk';
import { selectComments } from '../../store/comments/commentsSlice';
import CommentsItem from '../../components/commentsItem/commentsItem';

const NewItemPage = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const newsItem = useAppSelector(selectSingleNews);
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(getSingleNews(parseInt(id)));
    dispatch(getComments(parseInt(id)));
  }, [dispatch, id]);

  if (!newsItem) {
    return <Spinner/>;
  }

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
              <CommentsItem key={comment.id} comment={comment}/>
            )
          }
        </Box>
        <Box>
          <form>
            <Box>
              <Typography>Name</Typography>
                <TextField type="text"/>
            </Box>
            <Box>
              <Typography>Comment</Typography>
              <TextField type="text"/>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default NewItemPage;