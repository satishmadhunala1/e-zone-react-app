import React, { useState } from 'react';
import { computerData } from '../data/computers'; // No changes here
import Navbar from '../components/Navbar'; // No changes here
import { Link } from 'react-router-dom'; // No changes here

import './pag.css';

const CompPage = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // Handler for selecting/deselecting companies
  const companyHandler = (company) => {
    if (selectedCompanies.includes(company)) {
      setSelectedCompanies(selectedCompanies.filter((item) => item !== company));
    } else {
      setSelectedCompanies([...selectedCompanies, company]);
    }
  };

  // Filter products based on selected companies
  const filteredProducts =
    selectedCompanies.length === 0
      ? computerData
      : computerData.filter((item) => selectedCompanies.includes(item.company));

  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* Filters Section */}
        <div className="pro-selected">
          {Array.from(new Set(computerData.map((item) => item.company))).map(
            (company) => (
              <div className="pro-input" key={company}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(company)}
                    onChange={() => companyHandler(company)}
                  />
                  {company}
                </label>
              </div>
            )
          )}
        </div>

        {/* Displaying filtered products */}
        <div className="pageSection">
          {filteredProducts.map((item) => (
            <div key={item.id}>
              <Link to={`/computers/${item.id}`}>
                <div className="pageImg">
                  <img
                    src={item.image}
                    alt={`${item.company} ${item.model}`}
                  />
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

export default CompPage;
