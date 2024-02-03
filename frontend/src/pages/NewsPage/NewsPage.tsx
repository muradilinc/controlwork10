import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getNews } from '../../store/news/newsThunk';

const NewsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div>
      hew
    </div>
  );
};

export default NewsPage;