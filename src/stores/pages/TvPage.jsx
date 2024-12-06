import React, { useState } from "react";
import { tvData } from '../data/tv';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

import './pag.css';

const TvPage = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // Handler to select/deselect a company
  const companyHandler = (company) => {
    if (selectedCompanies.includes(company)) {
      setSelectedCompanies(selectedCompanies.filter((item) => item !== company));
    } else {
      setSelectedCompanies([...selectedCompanies, company]);
    }
  };

  // Filter products based on selected companies
  const filteredTvs =
    selectedCompanies.length === 0
      ? tvData
      : tvData.filter((tv) => selectedCompanies.includes(tv.company));

  return (
    <>
      <Navbar />
      <div className="fullpage">
        
        {/* Scrollable Filters Section */}
        <div className="pro-selected scrollable-filters">
          {Array.from(new Set(tvData.map((tv) => tv.company))).map((company) => (
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
          ))}
        </div>

        {/* Displaying Filtered TV products */}
        <div className="pageSection">
          {filteredTvs.map((tv) => (
            <div key={tv.id}>
              <Link to={`/tv/${tv.id}`}>
                <div className="pageImg">
                  <img src={tv.image} alt={`${tv.company} ${tv.model}`} />
                </div>
              </Link>
              <div className="proModel">
                {tv.company} {tv.model}
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default TvPage;
