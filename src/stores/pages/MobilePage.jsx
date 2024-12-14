import React, { useState } from 'react';
import { mobileData } from '../data/mobiles';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './pag.css';

const MobilePage = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Handler for selecting/deselecting brands
  const brandHandler = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };


  // Filter products based on selected brands and search query
  const filteredProducts = mobileData.filter((item) => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
    const matchesSearch =
      !searchQuery ||
      `${item.brand} ${item.model}`.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBrand && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <div className="fullpage">
        

        {/* Filters Section */}
        <div className="pro-selected scrollable-filters">
          {Array.from(new Set(mobileData.map((item) => item.brand))).map((brand) => (
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

        {/* Display Filtered Men's Products */}
        <div className="pageSection">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item.id}>
                <Link to={`/mobiles/${item.id}`}>
                  <div className="pageImg">
                    <img src={item.image} alt={`${item.brand} ${item.model}`} />
                  </div>
                </Link>
                <div className="proModel">
                  {item.brand} {item.model}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No products match your search or filters.</div>
          )}
        </div>
        
      </div>
    </>
  );
};

export default MobilePage;
