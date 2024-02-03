import React, { FormEvent, useRef, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { NewsState } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { createNews } from '../../store/news/newsThunk';

const NewsForm = () => {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [newsItem, setNewsItem] = useState<NewsState>({
    title: '',
    description: '',
    image: null,
  });
  const dispatch = useAppDispatch();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFilename(event.target.files[0].name);
    } else {
      setFilename('');
    }

    const {name, files} = event.target;

    if (files) {
      setNewsItem(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setNewsItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputImage = () => {
    if (inputImageRef.current) {
      inputImageRef.current.click();
    }
  };

  const addNewsItem = async (event: FormEvent) => {
    event.preventDefault();
    console.log(newsItem);
    await dispatch(createNews(newsItem));
    setNewsItem({
      title: '',
      description: '',
      image: null,
    });
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      margin: '20px 0',
    }}>
      <Typography variant="h2">
        Add new post
      </Typography>
      <form onSubmit={addNewsItem}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px 0'
        }}>
          <Box sx={{
            display: 'flex',
            gap: '0 15px'
          }}>
            <Typography variant="h4">
              Title
            </Typography>
            <TextField required type="text" name="title" value={newsItem.title} onChange={changeInput}/>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: '0px 15px'
          }}>
            <Typography variant="h4">
              Content
            </Typography>
            <TextField type="text" required rows={4} multiline name="description" value={newsItem.description} onChange={changeInput}/>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: '0px 15px'
          }}>
            <Typography variant="h4">
              Image
            </Typography>
            <input
              style={{display: 'none'}}
              type="file"
              name="image"
              onChange={onFileChange}
              ref={inputImageRef}
            />
            <TextField
              value={filename}
              onClick={handleInputImage}
            />
          </Box>
        </Box>
        <Button type="submit" variant="outlined">Add</Button>
      </form>
    </Box>
  );
};

export default NewsForm;