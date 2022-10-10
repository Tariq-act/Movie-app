import { createContext, useState, useEffect } from 'react';

const initialState = {
  movieList: [],
};

export const MovieContext = createContext(initialState);

export const MovieProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectRating, setSelectRating] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleRating = (e) => {
    setSelectRating(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    const getMovieData = async () => {
      const response = await fetch(
        `https://movie-task.vercel.app/api/popular?page=${currentPage}`
      );
      const data = await response.json();
      setMovieList(data.data.results);
    };
    getMovieData();
  }, [currentPage]);

  useEffect(() => {
    if (search) {
      const searchFilter = async () => {
        const response = await fetch(
          `https://movie-task.vercel.app/api/search?page=${currentPage}&query=${search}`
        );
        const data = await response.json();
        setMovieList(data.data.results);
      };

      searchFilter();
    }
  }, [search, currentPage]);

  // filter
  const applyFilter = () => {
    let filterList = movieList;

    if (selectRating) {
      filterList = filterList.filter((item) =>
        item.vote_average.toFixed(0).includes(selectRating)
      );
    }

    let y = parseInt(date.substring(0, 4));
    if (date) {
      filterList = filterList.filter((item) => {
        let movieYear = parseInt(item.release_date.substring(0, 4));
        console.log(movieYear, y);
        return y === movieYear;
      });
    }

    setMovieList(filterList);
  };

  useEffect(() => {
    applyFilter();
  }, [selectRating, date]);

  return (
    <MovieContext.Provider
      value={{
        movieList,
        handleSearch,
        search,
        selectRating,
        handleRating,
        nextPage,
        prevPage,
        date,
        handleDate,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
