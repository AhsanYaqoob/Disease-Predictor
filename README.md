# Disease Predictor

## Project Description
Disease Predictor is a healthcare accessibility project that leverages AI and machine learning to predict diseases based on medical reports and images. The system includes a Flask backend with multiple disease prediction models and a React frontend for user interaction, authentication, and visualization of nearby medical facilities.

## Features

### Backend
- Disease prediction endpoints for:
  - Liver Disease
  - Dengue
  - Malaria
  - Lung Cancer
- User authentication routes:
  - Register
  - Login
  - Logout
  - Get current user
- Uses OCR and image processing to extract features from medical reports and images.
- Models used:
  - Liver Disease: liver_disease_model.pkl (joblib)
  - Dengue: dengue_model.pkl (joblib)
  - Malaria: malaria_rf_model.pkl (joblib)
  - Lung Cancer: best_densenet_model.h5 (Keras)

### Frontend
- React app with authentication context and routing.
- Pages and components:
  - Login, Signup, OTP Verification, Forgot Password, Reset Password
  - Home page with sections: Home, Services, Hospitals (map), About Us
  - Navbar, Footer, Chatbot components
- Hospitals page shows nearby medical facilities on a Leaflet map using OpenStreetMap and WHO data.
- Smooth scrolling navigation and responsive design.

## Installation and Setup

### Backend Setup
1. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Ensure the models are placed in the `models/` directory:
   - liver_disease_model.pkl
   - dengue_model.pkl
   - malaria_rf_model.pkl
   - best_densenet_model.h5
4. Run the Flask backend:
   ```bash
   python backend/app.py
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory (if applicable).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the React app:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## Usage
- Register or login to access the application.
- Upload medical reports or images for disease prediction.
- View nearby hospitals and medical facilities on the Hospitals page.
- Use the chatbot for assistance.

## Technologies Used
- Backend: Python, Flask, TensorFlow/Keras, joblib, OpenCV, pytesseract
- Frontend: React, React Router, Axios, Leaflet, react-toastify
- Others: OpenStreetMap, WHO Health Facilities API

## License
This project is licensed under the MIT License.
