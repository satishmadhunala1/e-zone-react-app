import React, { useState } from 'react';
import { watchData } from '../data/watch';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

import './pag.css';

const WatchPage = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Handler for selecting/deselecting brands
  const brandHandler = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Filter products based on selected brands
  const filteredWatches =
    selectedBrands.length === 0
      ? watchData
      : watchData.filter((item) => selectedBrands.includes(item.brand));

  return (
    <>
      <Navbar />
      <div className="fullpage">
        
        {/* Filters Section */}
        <div className="pro-selected scrollable-filters">
          {Array.from(new Set(watchData.map((item) => item.brand))).map((brand) => (
            <div className="pro-input" key={brand}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => brandHandler(brand)}
                />
                {brand}
              </label>
            </div>
          ))}
        </div>

        {/* Displaying Filtered Watch Products */}
        <div className="pageSection">
          {filteredWatches.map((item) => (
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
          ))}
        </div>

      </div>
    </>
  );
};

export default WatchPage;
