import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import './MovieDetail.styles.css';

const MovieDetail = () => {
  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);
  const url = 'https://image.tmdb.org/t/p/original';
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState();

  const fetchData = async () => {
    const response = await fetch(
      `https://movie-task.vercel.app/api/movie?movieId=${id}`
    );
    const data = await response.json();
    setCurrentMovie(data.data);
  };

  return (
    currentMovie && (
      <div className='movie'>
        <div className='movie-image'>
          <img
            src={
              currentMovie.poster_path !== null
                ? url + currentMovie.poster_path
                : require('../../assets/image/no-image.jpg')
            }
            alt=''
          />
        </div>
        <div className='movie-content'>
          <div className='left'>
            <div className='image-wrapper'>
              <img
                src={
                  currentMovie.backdrop_path !== null
                    ? url + currentMovie.backdrop_path
                    : require('../../assets/image/no-image.jpg')
                }
                alt=''
              />
            </div>
          </div>
          <div className='right'>
            <h1>{currentMovie.title}</h1>
            <div className='tagTitle'>
              <p>{currentMovie.tagline}</p>
            </div>
            <div className='rating'>
              <span>
                <i className='fa-sharp fa-solid fa-star'></i>{' '}
                {currentMovie.vote_average.toFixed(1)}
              </span>{' '}
              votes(
              <span>{currentMovie.vote_count}</span>)
            </div>
            <div className='time'>
              <p>{currentMovie.runtime} min</p>
            </div>
            <div className='release-date'>
              <p>Release date : {currentMovie.release_date}</p>
            </div>
            <div className='genres'>
              {currentMovie.genres.map((category, idx) => (
                <p key={idx}>{category.name}</p>
              ))}
            </div>

            <div className='synopsis'>
              <h1>Synopsis</h1>
              <p>{currentMovie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MovieDetail;
