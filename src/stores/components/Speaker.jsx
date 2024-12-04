import React from "react";
import { speakerData } from "../data/speaker";
import { Link } from "react-router-dom";

const Speaker = () => {
  const firstFiveImages = speakerData.slice(0, 5);

  return (
    <>
      <div className="proTitle">
        <h2>Speaker</h2>
      </div>
      <div className="proSection">
        {firstFiveImages.map((item) => {
          return (
            <div className="imgBox">
              <Link to='/speaker'>
              <img className="proImage" src={item.image} alt="" />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Speaker;