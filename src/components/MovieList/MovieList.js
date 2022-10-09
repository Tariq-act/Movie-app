import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

import { useContext } from 'react';
import { MovieContext } from '../../context/context.api';

import './MovieList.styles.css';

const MovieList = () => {
  const { movieList } = useContext(MovieContext);
  return (
    <div className='movie-list'>
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} href={`/movie/${movie.id}`} />
      ))}
    </div>
  );
};

export default MovieList;
