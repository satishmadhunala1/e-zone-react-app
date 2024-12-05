import React from 'react';
import { kitchenData } from '../data/kitchen';  // No changes here
import Navbar from '../components/Navbar';  // No changes here
import { Link } from 'react-router-dom';  // No changes here

import './pag.css'


const KitchenPage = () => {
  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* Displaying all kitchen products */}
        <div className="pageSection">
          {kitchenData.map((item) => {
            return (
              <div key={item.id}>
                <Link to={`/kitchen/${item.id}`}>
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

export default KitchenPage;
