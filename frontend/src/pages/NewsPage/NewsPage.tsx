import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getNews } from '../../store/news/newsThunk';
import { selectNews } from '../../store/news/newsSlice';
import { Box, Button, Typography } from '@mui/material';
import NewItem from '../../components/newItem/newItem';

const NewsPage = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div>
      <Box sx={{
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h4">
          Posts
        </Typography>
        <Button variant="contained">
          Add new post
        </Button>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px 0',
      }}>
        {
          news.map(newItem =>
            <NewItem key={newItem.id} newItem={newItem}/>
          )
        }
      </Box>
    </div>
  );
};

export default NewsPage;