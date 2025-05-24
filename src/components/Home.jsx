import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../layouts/Button";
import '../styles/Home.css';

const images = [
  require('../assets/img/home.png'),
  require('../assets/img/img1.jpeg'),
  require('../assets/img/img2.jpg'),
  require('../assets/img/img3.jpeg'),
];

const Home = ({ servicesRef }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  // Image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to services section
  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="home-overlay">
        <div className="home-content">
          <h1 className="home-title">
            Care for Your Health Journey for a Brighter Tomorrow..
          </h1>
          <p className="home-text">
            We are enhancing healthcare accessibility using AI. By using this website,
            everyone will be able to understand their current medical condition. 
            It will also help to predict diseases according to your medical reports.
          </p>
          <Button title="See Services" onClick={scrollToServices} />
        </div>
      </div>
    </div>
  );
};

export default Home;