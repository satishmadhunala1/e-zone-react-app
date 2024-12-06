import React, { useState } from 'react';
import { menData } from '../data/men';  // No changes here
import Navbar from '../components/Navbar';  // No changes here
import { Link } from 'react-router-dom';  // No changes here

import './pag.css';

const MenPage = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Handler for selecting/deselecting brands
  const brandHandler = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Filter men's products based on selected brands
  const filteredProducts =
    selectedBrands.length === 0
      ? menData
      : menData.filter((item) => selectedBrands.includes(item.brand));

  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* Filters Section */}
        <div className="pro-selected scrollable-filters">
          {Array.from(new Set(menData.map((item) => item.brand))).map((brand) => (
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

        {/* Displaying filtered men's products */}
        <div className="pageSection">
          {filteredProducts.map((item) => (
            <div key={item.id}>
              <Link to={`/men/${item.id}`}>
                <div className="pageImg">
                  <img
                    src={item.image}
                    alt={`${item.brand} ${item.model}`}
                  />
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

export default MenPage;
