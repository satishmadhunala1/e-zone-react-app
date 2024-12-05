import React from 'react';
import { tvData } from '../data/tv';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const TvPage = () => {
  return (
    <>
      <Navbar />
      <div className="fullpage">
        
        {/* Displaying all TV products without filtering */}
        <div className='pageSection'>
          {tvData.map((tv) => {
            return (
              <div key={tv.id}>
                <Link to={`/tv/${tv.id}`}>
                  <div className="pageImg">
                    <img src={tv.image} alt={`${tv.company} ${tv.model}`} />
                  </div>
                </Link>
                <div className="proModel">
                  {tv.company} {tv.model}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TvPage;
