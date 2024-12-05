import React from 'react';
import { fridgeData } from '../data/fridge';  // No changes here
import Navbar from '../components/Navbar';  // No changes here
import { Link } from 'react-router-dom';  // No changes here

const FridgePage = () => {
  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* Displaying all fridge products */}
        <div className="pageSection">
          {fridgeData.map((item) => {
            return (
              <div key={item.id}>
                <Link to={`/fridge/${item.id}`}>
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

export default FridgePage;
