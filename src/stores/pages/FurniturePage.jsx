import React from 'react';
import { furnitureData } from '../data/furniture';  // No changes here
import Navbar from '../components/Navbar';  // No changes here
import { Link } from 'react-router-dom';  // No changes here

import './pag.css'


const FurniturePage = () => {
  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* Displaying all furniture products */}
        <div className="pageSection">
          {furnitureData.map((item) => {
            return (
              <div key={item.id}>
                <Link to={`/furniture/${item.id}`}>
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

export default FurniturePage;
