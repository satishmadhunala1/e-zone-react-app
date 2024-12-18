import React, { useState } from 'react';
import { mobileData } from '../data/mobiles';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './pag.css';

const MobilePage = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);

  const companyHandler = (mango) => {
    if (selectedProduct.includes(mango)) {
      setSelectedProduct(selectedProduct.filter((item) => item !== mango));
    } else {
      setSelectedProduct([...selectedProduct, mango]);
    }
  };

  // Extract unique companies from mobileData
  const uniqueCompanies = Array.from(new Set(mobileData.map((mobile) => mobile.company)));

  // Filter products based on selected companies
  const filteredProduct =
    selectedProduct.length === 0
      ? mobileData
      : mobileData.filter((orange) => selectedProduct.includes(orange.company));

  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* Filters Section */}
        <div className="pro-selected">
          {uniqueCompanies.map((company) => (
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

        {/* Displaying filtered products */}
        <div className="pageSection">
          {filteredProduct.map((item) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default MobilePage;
