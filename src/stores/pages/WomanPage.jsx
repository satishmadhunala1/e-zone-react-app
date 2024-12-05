import React from 'react';
import { womanData } from '../data/woman';  // No changes here
import Navbar from '../components/Navbar';  // No changes here
import { Link } from 'react-router-dom';  // No changes here

const WomanPage = () => {
  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* Displaying all products without filtering */}
        <div className="pageSection">
          {womanData.map((item) => {
            return (
              <div key={item.id}>
                <Link to={`/woman/${item.id}`}>
                  <div className="pageImg">
                    <img src={item.image} alt={`${item.brand} ${item.model}`} />
                  </div>
                </Link>
                <div className="proModel">
                  {item.brand} {item.model}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WomanPage;
