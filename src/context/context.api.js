import { createContext, useState, useEffect } from 'react';

const initialState = {
  movieList: [],
};

export const MovieContext = createContext(initialState);

export const MovieProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]);
  const [list, setList] = useState([]);
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

  // Full page Render
  useEffect(() => {
    const getMovieData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/popular?page=${currentPage}`
      );
      const data = await response.json();

      setMovieList(data.data.results);
      setList(data.data.results);
    };
    getMovieData();
  }, [currentPage]);

  // Search filter  Render
  useEffect(() => {
    if (search) {
      const searchFilter = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/search?page=${currentPage}&query=${search}`
        );
        const data = await response.json();
        setMovieList(data.data.results);
      };

      searchFilter();
    }
  }, [search, currentPage]);

  // Select Rating filter
  useEffect(() => {
    if (selectRating) {
      const getMovieData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/popular?page=${currentPage}`
        );
        const data = await response.json();
        let filterList = data.data.results.filter(
          (item) => item.vote_average.toFixed(0) === selectRating
        );
        setMovieList(filterList);
      };
      getMovieData();
    } else if (selectRating === '') {
      setMovieList(list);
    }
    // eslint-disable-next-line
  }, [selectRating, currentPage]);

  useEffect(() => {
    let y = parseInt(date.substring(0, 4));
    if (date) {
      const getMovieData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/popular?page=${currentPage}`
        );
        const data = await response.json();
        let filterList = data.data.results.filter((item) => {
          let movieYear = parseInt(item.release_date.substring(0, 4));
          return y === movieYear;
        });
        setMovieList(filterList);
      };
      getMovieData();
    } else if (date === '') {
      setMovieList(list);
    }
    // eslint-disable-next-line
  }, [date, currentPage]);

  let filterList = movieList;

  if (selectRating) {
    filterList = filterList.filter(
      (item) => item.vote_average.toFixed(0) === selectRating
    );
  }
  console.log(filterList);

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
