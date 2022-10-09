import React from 'react';
import { Link } from 'react-router-dom';

import './MovieCard.styles.css';

const MovieCard = ({ movie, href }) => {
  const imgUrl = 'https://image.tmdb.org/t/p/original';
  // console.log(typeof movie.release_date.split('-')[0].toString());
  return (
    <Link to={href}>
      <div className='movie-card'>
        <div className='image-wrapper'>
          <img
            src={
              movie.backdrop_path === null
                ? require('../../assets/image/no-image.jpg')
                : imgUrl + movie.backdrop_path
            }
            alt=''
          />
        </div>
        <div className='content'>
          <div className='rating'>
            <i className='fa-sharp fa-solid fa-star'></i> {movie.vote_average}
          </div>
          <h1 className='title'> {movie.title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
