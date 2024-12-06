import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { name: "Mobiles", path: "/mobiles" },
    { name: "Computers", path: "/computers" },
    { name: "Watches", path: "/watch" },
    { name: "Mens Wear", path: "/men" },
    { name: "Woman Wear", path: "/woman" },
    { name: "Furniture", path: "/furniture" },
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

  return (
    <div className="navbar-section">
      <div className="navSection">
        <Link to="/" className="custom-link">
          <div className="title">
            <h2>E-Mart</h2>
          </div>
        </Link>

        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </div>

        <div className="user">
          <Link to="/Login" className="custom-link">
            <div className="user-detail">SignIn/SignUp</div>
          </Link>
        </div>

        <Link to="/cart" className="custom-link">
          <div className="cart">
            Cart
            <span>{cartItems.length}</span>
          </div>
        </Link>
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
