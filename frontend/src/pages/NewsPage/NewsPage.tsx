import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getNews } from '../../store/news/newsThunk';
import { selectNews } from '../../store/news/newsSlice';
import { Box, Typography } from '@mui/material';
import NewItem from '../../components/newItem/newItem';
import { Link } from 'react-router-dom';

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
        <Link to='/form' style={{
          background: 'blue',
          padding: '5px 15px',
          borderRadius: '5px',
          textDecoration: 'none',
          color: 'white',
          fontSize: '22px',
        }}>
          Add new post
        </Link>
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