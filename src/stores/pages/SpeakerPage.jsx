import React, { useState } from "react";
import { speakerData } from "../data/speaker";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import './pag.css';

const SpeakerPage = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Handler to select/deselect a company
  const companyHandler = (company) => {
    setSelectedCompanies((prevSelected) =>
      prevSelected.includes(company)
        ? prevSelected.filter((item) => item !== company)
        : [...prevSelected, company]
    );
  };
  

  // Filter speakers based on selected companies and search query
  const filteredSpeakers = speakerData.filter((speaker) => {
    const matchesCompany =
      selectedCompanies.length === 0 || selectedCompanies.includes(speaker.company);
    const matchesSearch =
      !searchQuery ||
      `${speaker.company} ${speaker.model}`.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCompany && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <div className="fullpage">

        {/* Scrollable Filters Section */}
        <div className="pro-selected ">
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

        {/* Display Filtered Speakers */}
        <div className="pageSection">
          {filteredSpeakers.length > 0 ? (
            filteredSpeakers.map((speaker) => (
              <div key={speaker.id}>
                <Link to={`/speaker/${speaker.id}`}>
                  <div className="pageImg">
                    <img src={speaker.image} alt={`${speaker.company} ${speaker.model}`} />
                  </div>
                </Link>
                <div className="proModel">
                  {speaker.company} {speaker.model}
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

export default SpeakerPage;
