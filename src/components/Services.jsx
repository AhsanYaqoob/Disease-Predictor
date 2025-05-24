import React from "react";
import LungCancerCard from "../Services/LungCancerCard";
import LiverCard from "../Services/LiverDiseaseCard";
import DengueCard from "../Services/DengueCard";
import MalariaCard from "../Services/MalariaCard";
import "../styles/Services.css";

const Services = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="services-container">
      <div className="services-header">
        <h1 className="services-title">Our Services</h1>
        <p className="services-description">
          Add your medical reports in the respective section for prediction results and further medication.
        </p>
      </div>
      <div className="services-cards">
        <LungCancerCard />
        <LiverCard />
        <DengueCard />
        <MalariaCard />
      </div>
    </div>
  );
});

export default Services;
