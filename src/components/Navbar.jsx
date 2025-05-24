import React, { useState } from "react";
import { Link } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
//import Contact from "../Login/Login";
import "../styles/Navbar.css"; 

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const openForm = () => {
    setShowForm(true);
    setMenu(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="home" spy={true} smooth={true} duration={500}>
            <h1 className="logo-text">Disease Predictor.</h1>
          </Link>
        </div>

        <nav className="navbar-links">
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="navbar-link"
          >
            Home
          </Link>
          <Link
            to="services"
            spy={true}
            smooth={true}
            duration={500}
            className="navbar-link"
          >
            Services
          </Link>
          <Link
            to="hospitals"
            spy={true}
            smooth={true}
            duration={500}
            className="navbar-link"
          >
            Hospitals
          </Link>
         
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="navbar-link"
          >
            About Us
          </Link>
          
          
         
        </nav>

        <div className="navbar-signin">
          
        </div>

        

        <div className="navbar-mobile-menu">
          {menu ? (
            <AiOutlineClose size={28} onClick={handleChange} />
          ) : (
            <AiOutlineMenu size={28} onClick={handleChange} />
          )}
        </div>
      </div>

      
      <div className={`mobile-menu ${menu ? "show" : ""}`}>
        <Link
          to="home"
          spy={true}
          smooth={true}
          duration={500}
          className="mobile-link"
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to="about"
          spy={true}
          smooth={true}
          duration={500}
          className="mobile-link"
          onClick={closeMenu}
        >
          About Us
        </Link>
        <Link
          to="services"
          spy={true}
          smooth={true}
          duration={500}
          className="mobile-link"
          onClick={closeMenu}
        >
          Services
        </Link>
        <Link
          to="doctors"
          spy={true}
          smooth={true}
          duration={500}
          className="mobile-link"
          onClick={closeMenu}
        >
          Doctors
        </Link>
        <Link
          to="blog"
          spy={true}
          smooth={true}
          duration={500}
          className="mobile-link"
          onClick={closeMenu}
        >
          Blog
        </Link>

        <div className="mobile-contact-btn">
          <button className="signin-btn" onClick={openForm}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
