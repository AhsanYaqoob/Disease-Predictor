import React from "react";
import img from "../assets/img/aboutus.png";
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-text">
        <h1 className="about-title">About Us</h1>
        <p>
     In today’s fast-paced world, early disease detection is critical—yet many lack access to timely, 
     affordable medical analysis. Our AI-powered Disease Prediction Website bridges this gap by allowing 
     users to upload medical reports and receive instant predictions for diseases like lung cancer, dengue, 
     liver disease, and malaria. Built on machine learning models trained with real medical data, the
      platform empowers individuals to take control of their health from home with fast, reliable results.
        </p>
        <p>
       More than just a diagnostic tool, our platform offers an all-in-one health companion experience. 
       Users can find nearby doctors via Google Maps, access disease information, get emergency medicine
        suggestions, and chat with healthcare advisors. Our mission is to revolutionize healthcare by 
        making it smarter, more accessible, and proactive—especially in areas with limited
        infrastructure—ultimately reducing hospital burdens and fostering a healthier, more connected society.

        </p>
        
      </div>
      <div className="about-image">
        <img className="about-img" src={img} alt="About" />
      </div>
    </div>
  );
};

export default About;
