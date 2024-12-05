import React from 'react';
import { mobileData } from '../data/mobiles';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

import './pag.css'



const MobilePage = () => {
  return (
    <>
      <Navbar />
      <div className="fullpage">
        
        {/* Displaying all products without filter */}


        
        <div className="pageSection">
          {mobileData.map((item) => {
            return (
              <div key={item.id}>
                <Link to={`/mobiles/${item.id}`}>
                  <div className="pageImg">
                    <img src={item.image} alt={`${item.company} ${item.model}`} />
                  </div>
                </Link>
                <div className="proModel">
                  {item.company} {item.model}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobilePage;
