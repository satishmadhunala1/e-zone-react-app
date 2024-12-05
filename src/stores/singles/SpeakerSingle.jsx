import React from "react";
import { speakerData } from "../data/speaker";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";


import './sing.css'


const SpeakerSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Ensure id from params is a string and match it with the speakerData
  const product = speakerData.find((item) => item.id ==(id));

  if (!product) {
    return <p>Product not found.</p>;
  }

  // Handler to add the product to the cart and show an alert
  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.model} has been added to your cart!`);
  };
  return (
    <>
      <Navbar />
      <div className="ind-section">
        <div className="ind-image">
          <img src={product.image} alt={product.model} />
        </div>
        <div className="ind-details space">
          <div className="ind-company">
            <h2>{product.company}</h2>
          </div>
          <div className="ind-model space">
            <h3>{product.model}</h3>
          </div>
          <div className="ind-price space">
            <h2>{product.price}</h2>
          </div>
          <div className="ind-desc space">
            <p>{product.description}</p>
          </div>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </>
  );
};
export default SpeakerSingle;
