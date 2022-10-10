import './App.css';
import MovieList from './components/MovieList/MovieList';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, Link } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Paginate from './components/paginate/Paginate';

function App() {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <Navbar />
              <div className='container'>
                <Paginate />
                <MovieList />
              </div>
            </div>
          }
        />
        <Route
          path='/movie/:id'
          element={
            <div className='container'>
              <Link to={'/'}>
                <button className='movie-button'>Back to home</button>
              </Link>
              <MovieDetail />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
