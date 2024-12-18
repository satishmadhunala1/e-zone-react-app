import React, { useState } from 'react';
import { fridgeData } from '../data/fridge';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './pag.css';

const FridgePage = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const brandHandler = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Extract unique brands from fridgeData
  const uniqueBrands = Array.from(new Set(fridgeData.map((item) => item.brand)));

  // Filter fridge products based on selected brands
  const filteredProducts =
    selectedBrands.length === 0
      ? fridgeData
      : fridgeData.filter((item) => selectedBrands.includes(item.brand));

  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* Filters Section */}
        <div className="pro-selected">
          {uniqueBrands.map((brand) => (
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

        {/* Displaying filtered fridge products */}
        <div className="pageSection">
          {filteredProducts.map((item) => (
            <div key={item.id}>
              <Link to={`/fridge/${item.id}`}>
                <div className="pageImg">
                  <img src={item.image} alt={`${item.brand} ${item.model}`} />
                </div>
              </Link>
              <div className="proModel">
                {item.brand} {item.model}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FridgePage;
