import React, { useContext, useEffect, useState } from 'react';

import { MovieContext } from '../../context/context.api';

import './Navbar.styles.css';

const Navbar = () => {
  const {
    handleSearch,
    search,
    selectRating,
    handleRating,
    years,
    handleYear,
  } = useContext(MovieContext);
  const [year, setYear] = useState([]);

  let todayYear = new Date().getFullYear();
  let totalYears = [];
  for (let i = 0; i < 101; i++) {
    totalYears.push(todayYear - i);
  }
  useEffect(() => {
    setYear(totalYears);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='navbar'>
      <div className='logo'>
        <h1>
          Movie<span className='logo_span'>Watcher</span>
        </h1>
      </div>
      <div className='filters'>
        <div className='ratingFilter'>
          <select name='' id='' value={selectRating} onChange={handleRating}>
            <option value=''>Select Rating</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
          </select>
        </div>
        <div className='dateFilter'>
          {/* <input type='date' value={date} onChange={handleDate} /> */}
          <select name='year' id='' value={years} onChange={handleYear}>
            <option value=''>Select Year</option>
            {year.map((item, idx) => (
              <option key={idx} value={`${item}`}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='search-field'>
          <input
            value={search}
            type='search'
            placeholder='Search...'
            onChange={handleSearch}
            onSubmit={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
