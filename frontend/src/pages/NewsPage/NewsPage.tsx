import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getNews } from '../../store/news/newsThunk';
import { getComments } from '../../store/comments/commentsThunk';
import { selectComments } from '../../store/comments/commentsSlice';

const NewsPage = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(getNews());
    dispatch(getComments());
  }, [dispatch]);

  console.log(comments);

  return (
    <div>
      hew
    </div>
  );
};

export default NewsPage;