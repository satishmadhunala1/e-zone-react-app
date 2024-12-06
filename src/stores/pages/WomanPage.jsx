import React, { useState } from 'react';
import { womanData } from '../data/woman';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

import './pag.css';

const WomanPage = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Handler to select/deselect brands
  const brandHandler = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Filter products based on selected brands
  const filteredProducts =
    selectedBrands.length === 0
      ? womanData
      : womanData.filter((item) => selectedBrands.includes(item.brand));

  return (
    <>
      <Navbar />
      <div className="fullpage">
        
        {/* Filters Section */}
        <div className="pro-selected scrollable-filters">
          {Array.from(new Set(womanData.map((item) => item.brand))).map((brand) => (
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

        {/* Displaying Filtered Women's Products */}
        <div className="pageSection">
          {filteredProducts.map((item) => (
            <div key={item.id}>
              <Link to={`/woman/${item.id}`}>
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

export default WomanPage;
