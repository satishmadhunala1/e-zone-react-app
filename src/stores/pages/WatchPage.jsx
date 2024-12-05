import React from 'react';
import { watchData } from '../data/watch';  // No changes here
import Navbar from '../components/Navbar';  // No changes here
import { Link } from 'react-router-dom';  // No changes here

const WatchPage = () => {
  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* Displaying all watches */}
        <div className="pageSection">
          {watchData.map((item) => {
            return (
              <div key={item.id}>
                <Link to={`/watch/${item.id}`}>
                  <div className="pageImg">
                    <img src={item.image} alt={`${item.brand} ${item.model}`} />
                  </div>
                </Link>
                <div className="proModel">
                  {item.brand}, {item.model}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WatchPage;
