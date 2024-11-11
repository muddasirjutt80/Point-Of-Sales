import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { BiCart } from "react-icons/bi";
import { BsListNested } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { message } from "antd";
import axios from "axios";
import { lHost } from "../host";

import "./nav.css";

const LayoutApp = ({ children }) => {
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [icon, setIcon] = useState(
    <BsListNested style={{ marginLeft: "13px", fontWeight: "600" }} />
  );

  // const [oldIcon, setOldIcon] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavVisible((prevIsNavVisible) => {
      if (prevIsNavVisible) {
        setIcon(
          <BsListNested style={{ marginLeft: "13px", fontWeight: "600" }} />
        );
        return false;
      } else {
        setIcon(<FaTimes style={{ marginLeft: "13px" }} />);
        return true;
      }
    });
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${lHost}/api/user/get-profile`);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${lHost}/api/user/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/login");
        message.success("Logged out successfully!");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      message.error("Error during logout. Please try again!");
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <nav className="navbar">
        <div className="menu-icon" onClick={toggleNav}>
          {icon}
        </div>
        <ul className={`nav-links ${isNavVisible ? "active" : ""}`}>
          <li className="menuBtn">
            <Link to="/">Home</Link>
          </li>

          <li className="menuBtn">
            <Link to="/products">Products</Link>
          </li>
          <li className="menuBtn">
            <Link to="/categories">Categories</Link>
          </li>
          <li className="menuBtn">
            <Link to="/bills">Bills</Link>
          </li>
          <li className="menuBtn">
            <Link to="/customers">Customers</Link>
          </li>
          <li className="menuBtn">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="logoutBTN" onClick={handleLogout}>
            Logout
          </li>
        </ul>
        <div className="user">
          <p>{userData.companyName ? userData.companyName : "Company Name"}</p>
        </div>
        <div className="cart-items" onClick={() => navigate("/cart")}>
          <BiCart />
          <small
            style={{
              fontSize: "12px",
              background: "orange",
              padding: "0px 5px",
              paddingBottom: "1.5px",
              margin: "0px",
              borderRadius: "50%",
            }}
          >
            {cartItems.length}
          </small>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default LayoutApp;
