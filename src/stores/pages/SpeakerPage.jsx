import React from "react";
import { speakerData } from "../data/speaker";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const SpeakerPage = () => {
  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* Displaying all products without filtering */}
        <div className="pageSection">
          {speakerData.map((speak) => {
            return (
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
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SpeakerPage;
