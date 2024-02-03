import { Route, Routes } from 'react-router-dom';
import NewsPage from './pages/NewsPage/NewsPage';
import NotFoundPage from './pages/NotFoundPage/notFoundPage';

const App = () => {

  return (
    <>
     <Routes>
       <Route path={'/'} element={<NewsPage/>}/>
       <Route path={'*'} element={<NotFoundPage/>}/>
     </Routes>
    </>
  );
};

export default App;