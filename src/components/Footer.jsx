import React from "react";
import { Link } from "react-scroll";
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h1 className="footer-title">Disease Predictor</h1>
          <p className="footer-description">
            Our AI-based website lets users upload medical reports to instantly predict diseases like
             lung cancer and dengue. It offers fast, reliable health insights using medical report.
          </p>
        </div>
        <div className="footer-section">
         
          <nav className="footer-nav">
          <Link to="home" spy={true} smooth={true} duration={500} className="footer-link">
              Home
            </Link>
            <Link to="services" spy={true} smooth={true} duration={500} className="footer-link">
              Services
            </Link>
            <Link to="hospitals" spy={true} smooth={true} duration={500} className="footer-link">
              Hospitals
            </Link>
            
            <Link to="about" spy={true} smooth={true} duration={500} className="footer-link">
              About
            </Link>
            
            
          </nav>
        </div>
        <div className="footer-section">
          <h1 className="footer-subtitle">Services</h1>
          <nav className="footer-nav">
            <Link to="services" spy={true} smooth={true} duration={500} className="footer-link">
              Lung cancer
            </Link>
            <Link to="services" spy={true} smooth={true} duration={500} className="footer-link">
              Liver
            </Link>
            <Link to="services" spy={true} smooth={true} duration={500} className="footer-link">
              Dengue
            </Link>
            <Link to="services" spy={true} smooth={true} duration={500} className="footer-link">
              Malaria
            </Link>
          </nav>
        </div>
        <div className="footer-section">
          <h1 className="footer-subtitle">Contact Us</h1>
          <nav className="footer-nav">
            <Link to="/" className="footer-link">
              Air University Aerospace and Aviation Campus Kamra
            </Link>
            <Link to="/" className="footer-link">
              215177@aack.au.edu.pk
            </Link>
            <Link to="/" className="footer-link">
              +923046395049
            </Link>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          @copyright developed by
          <span className="footer-highlight"> Disease Predictor</span> | All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
