import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { getNews } from './store/news/newsThunk';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div>
      <h1>news</h1>
    </div>
  );
};

export default App;