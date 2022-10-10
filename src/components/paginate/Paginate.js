import React, { useContext } from 'react';

import { MovieContext } from '../../context/context.api';

import './Paginate.styles.css';

const Paginate = () => {
  const { nextPage, prevPage } = useContext(MovieContext);
  return (
    <div className='paginate'>
      <button onClick={prevPage}>Prev</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default Paginate;
