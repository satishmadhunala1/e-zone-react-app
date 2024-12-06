import React, { useState } from "react";
import { speakerData } from "../data/speaker";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import './pag.css';

const SpeakerPage = () => {
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
  const filteredSpeakers =
    selectedCompanies.length === 0
      ? speakerData
      : speakerData.filter((speaker) => selectedCompanies.includes(speaker.company));

  return (
    <>
      <Navbar />
      <div className="fullpage">
        
        {/* Scrollable Filters Section */}
        <div className="pro-selected scrollable-filters">
          {Array.from(new Set(speakerData.map((item) => item.company))).map(
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

        {/* Displaying Filtered Speakers */}
        <div className="pageSection">
          {filteredSpeakers.map((speak) => (
            <div key={speak.id}>
              <Link to={`/speaker/${speak.id}`}>
                <div className="pageImg">
                  <img src={speak.image} alt={`${speak.company} ${speak.model}`} />
                </div>
              </Link>
              <div className="proModel">
                {speak.company} {speak.model}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
};

export default SpeakerPage;
