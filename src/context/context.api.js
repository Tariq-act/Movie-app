import { createContext, useState, useEffect } from 'react';

const initialState = {
  movieList: [],
};

export const MovieContext = createContext(initialState);

export const MovieProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectRating, setSelectRating] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleRating = (e) => {
    setSelectRating(e.target.value);
  };

  useEffect(() => {
    const getMovieData = async () => {
      const response = await fetch(
        'https://movie-task.vercel.app/api/popular?page=1'
      );
      const data = await response.json();
      setMovieList(data.data.results);
    };
    getMovieData();
  }, []);

  useEffect(() => {
    if (search) {
      const searchFilter = async () => {
        const response = await fetch(
          `https://movie-task.vercel.app/api/search?page=1&query=${search}`
        );
        const data = await response.json();
        setMovieList(data.data.results);
      };

      searchFilter();
    }
  }, [search]);

  // filter
  const applyFilter = () => {
    let filterList = movieList;
    // console.log(filterList);
    if (selectRating) {
      filterList = filterList.filter((item) =>
        item.vote_average.toFixed(0).includes(selectRating)
      );
    }
    setMovieList(filterList);
  };

  useEffect(() => {
    applyFilter();
  }, [selectRating]);

  return (
    <MovieContext.Provider
      value={{ movieList, handleSearch, search, selectRating, handleRating }}
    >
      {children}
    </MovieContext.Provider>
  );
};
