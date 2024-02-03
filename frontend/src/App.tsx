import { Route, Routes } from 'react-router-dom';
import NewsPage from './pages/NewsPage/NewsPage';
import NotFoundPage from './pages/NotFoundPage/notFoundPage';
import NewItemPage from './pages/NewItemPage/NewItemPage';
import { Container } from '@mui/material';
import Header from './components/Header/Header';

const App = () => {

  return (
    <>
      <Header/>
      <Container maxWidth="xl">
        <Routes>
          <Route path={'/'} element={<NewsPage/>}/>
          <Route path={'/news/:id'} element={<NewItemPage/>}/>
          <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;