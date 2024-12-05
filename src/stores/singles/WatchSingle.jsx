import React from "react";
import { watchData } from "../data/watch";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import "./single.css";


const WatchSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Find the product based on the id from params
  const product = watchData.find((item) => item.id === id);

  // Handler to add the product to the cart and display an alert
  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.model} has been added to your cart!`);
  };

  // If product not found, show an error message
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="error-message">
          <h2>Product not found</h2>
        </div>
      </>
    );
  }

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
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default WatchSingle;
