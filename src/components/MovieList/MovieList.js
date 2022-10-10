import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

import { useContext } from 'react';
import { MovieContext } from '../../context/context.api';

import './MovieList.styles.css';

const MovieList = () => {
  const { movieList } = useContext(MovieContext);
  return (
    <>
      <div className='movie-list'>
        {movieList.length > 0 &&
          movieList.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              href={`/movie/${movie.id}`}
            />
          ))}
      </div>

      {movieList.length === 0 && (
        <h1
          style={{
            color: 'white',
            textAlign: 'center',
            marginTop: '2rem',
          }}
        >
          No Result Found
        </h1>
      )}
    </>
  );
};

export default MovieList;
