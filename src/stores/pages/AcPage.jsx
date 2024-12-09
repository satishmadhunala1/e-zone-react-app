import React, { useState } from 'react';
import { acData } from '../data/ac';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './pag.css';

const AcPage = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  
  const companyHandler = (company) => {
    setSelectedProduct((prevSelected) =>
      prevSelected.includes(company)
        ? prevSelected.filter((item) => item !== company)
        : [...prevSelected, company]
    );
  };


  // Filter products based on selected companies and search query
  const filteredProduct = acData.filter((item) => {
    const matchesCompany =
      selectedProduct.length === 0 || selectedProduct.includes(item.company);
    const matchesSearch =
      !searchQuery ||
      `${item.company} ${item.model}`.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCompany && matchesSearch;
  });


  return (
    <>
      <Navbar />
      <div className="fullpage">
       

        {/* Checkbox Filters */}
        <div className="pro-selected">
          {Array.from(new Set(acData.map((item) => item.company))).map((company) => (
            <div className="pro-input" key={company}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedProduct.includes(company)}
                  onChange={() => companyHandler(company)}
                />
                {company}
              </label>
            </div>
          ))}
        </div>

        {/* Display Filtered Products */}
        <div className="pageSection">
          {filteredProduct.length > 0 ? (
            filteredProduct.map((item) => (
              <div key={item.id}>
                <Link to={`/ac/${item.id}`}>
                  <div className="pageImg">
                    <img src={item.image} alt={`${item.company} ${item.model}`} />
                  </div>
                </Link>
                <div className="proModel">
                  {item.company}, {item.model}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No items match your search or filters.</div>
          )}
        </div>

      </div>
    </>
  );
};

export default AcPage;
