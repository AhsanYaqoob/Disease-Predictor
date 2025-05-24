import React from "react";
import "../styles/Button.css"; 
const Button = ({ title, onClick }) => {
  return (
    <button className="your-button-class" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;