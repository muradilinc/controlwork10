import React from 'react';
import { News } from '../../types';
import { Box, Button, Paper, Typography } from '@mui/material';
import { BASE_URL } from '../../constants/constants';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { deleteNews, getNews } from '../../store/news/newsThunk';

interface Props {
  newItem: News;
}

const NewItem: React.FC<Props> = ({newItem}) => {
  const dispatch = useAppDispatch();

  const deleteHandle = async (id: number) => {
    await dispatch(deleteNews(id));
    await dispatch(getNews());
  };

  return (
    <Paper sx={{
      display: "flex",
      padding: '10px',
      alignItems: "center",
    }}>
      <img
        height="150"
        src={BASE_URL + '/' + newItem.image}
        alt="image"
      />
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px'
      }}>
        <Typography>
          {newItem.title}
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography>
            {dayjs(newItem.createdAt).format('DD.MM.YYYY HH:MM:SSS')}
          </Typography>
          <Link to={`/news/${newItem.id}`}>
            <Typography>
              Read Full
            </Typography>
          </Link>
          <Button onClick={() => deleteHandle(newItem.id)} color="error">Delete</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default NewItem;