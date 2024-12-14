import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import './comp.css';


const Navbar = () => {
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Computers", path: "/computers" },
    { name: "Watches", path: "/watch" },
    { name: "Mens Wear", path: "/men" },
    { name: "Woman Wear", path: "/woman" },
    { name: "Furniture", path: "/furniture" },
    { name: "Mobiles", path: "/mobiles" },
    { name: "Kitchen", path: "/kitchen" },
    { name: "Fridge", path: "/fridge" },
    { name: "Speakers", path: "/speaker" },
    { name: "TV's", path: "/tv" },
    { name: "AC", path: "/ac" },
  ];

  // Filter items based on the search query
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    // Clear authentication-related data (localStorage/sessionStorage)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/Login");
  };

  return (
    <div className="navbar-section">
      <div className="navSection">
        <Link to="/" className="custom-link">
          <div className="title">
            <h2>E-Zone</h2>
          </div>
        </Link>

        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="user">
          
          <Link to="/Login" className="custom-link">
            <div className="user-detail">Login/SignUp</div>
          </Link>
        </div>

        <Link to="/cart" className="custom-link">
          <div className="cart">
      
            Cart
            <span>{cartItems.length}</span>
          </div>
        </Link>
        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="subMenu">
        <ul>
          {filteredItems.map((item) => (
            <Link to={item.path} key={item.name} className="custom-link">
              <li>{item.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;