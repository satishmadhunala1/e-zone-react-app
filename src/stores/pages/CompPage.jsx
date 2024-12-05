import React from 'react';
import { computerData } from '../data/computers';  // No changes here
import Navbar from '../components/Navbar';  // No changes here
import { Link } from 'react-router-dom';  // No changes here

const CompPage = () => {
  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* Displaying all products without filter */}
        <div className="pageSection">
          {computerData.map((item) => {
            return (
              <div key={item.id}>
                <Link to={`/computers/${item.id}`}>
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

export default CompPage;
