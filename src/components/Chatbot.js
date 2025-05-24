import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([{ type: 'bot', text: 'Hi, how can I help you?' }]);
  const [isThinking, setIsThinking] = useState(false); 

  const qaData = [
    { question: "What is the Disease Predictor?", answer: "The Disease Predictor is a healthcare platform that uses machine learning algorithms to predict diseases based on users' medical histories." },
    { question: "What diseases can the platform predict?", answer: "The platform can predict diseases such as lung cancer, liver disease, dengue, and more based on user medical data." },
    { question: "What technology is used in the Disease Predictor?", answer: "The platform uses machine learning (ML) and deep learning (DL) techniques for disease prediction." },
    { question: "How does the Disease Predictor help users?", answer: "It provides disease predictions, medical recommendations, and helps users locate nearby doctors and laboratories." },
    { question: "What is the main goal of the Disease Predictor?", answer: "The main goal is to identify diseases at their earliest stages to improve treatment outcomes and reduce mortality rates." },
    { question: "What kind of data does the platform use?", answer: "The platform analyzes medical reports provided by users to predict diseases." },
    { question: "How is Google Maps integrated into the system?", answer: "Google Maps is integrated to help users locate nearby healthcare providers such as doctors and laboratories." },
    { question: "How accurate are the disease predictions?", answer: "The platform uses advanced machine learning models, ensuring high accuracy, though this depends on the quality of input data." },
    { question: "What is the purpose of using Machine Learning in the project?", answer: "Machine learning is used to process medical data and predict diseases by analyzing patterns and correlations." },
    { question: "What kind of interface does the platform have?", answer: "The platform has a user-friendly interface where users can input medical data and get predictions." },
    
   
    { question: "What is lung cancer?", answer: "Lung cancer is a type of cancer that begins in the lungs, often due to smoking or exposure to harmful substances." },
    { question: "How does the platform predict lung cancer?", answer: "The platform uses machine learning models to analyze medical imaging and user data to predict lung cancer." },
    { question: "What are the symptoms of lung cancer?", answer: "Symptoms of lung cancer include persistent coughing, chest pain, and difficulty breathing." },
    { question: "How can early detection of lung cancer help?", answer: "Early detection of lung cancer can lead to more effective treatment, improving patient outcomes and survival rates." },
    { question: "What role does AI play in detecting lung cancer?", answer: "AI helps analyze complex data like CT scans to detect early signs of lung cancer more accurately than traditional methods." },
    
    { question: "What is liver disease?", answer: "Liver disease refers to any condition that damages the liver and affects its function, including cirrhosis and hepatitis." },
    { question: "How does the platform predict liver disease?", answer: "The platform uses machine learning models trained on patient data to predict liver disease risk." },
    { question: "What are the symptoms of liver disease?", answer: "Symptoms include jaundice, fatigue, nausea, and abdominal pain." },
    { question: "What AI techniques are used in predicting liver disease?", answer: "AI techniques such as Random Forest and Naive Bayes are used to predict liver disease." },
    { question: "What is the accuracy of liver disease prediction in the platform?", answer: "The AI models used in the platform for liver disease prediction have an accuracy rate between 87% and 90%." },

    { question: "What is dengue?", answer: "Dengue is a mosquito-borne viral infection that causes fever, headaches, muscle pain, and in severe cases, hemorrhagic fever." },
    { question: "How does the platform predict dengue outbreaks?", answer: "The platform uses machine learning algorithms such as Weighted Random Forest (WRF) to predict dengue outbreaks." },
    { question: "What are the symptoms of dengue?", answer: "Symptoms include high fever, severe headaches, pain behind the eyes, joint and muscle pain, rash, and mild bleeding." },
    { question: "How does early detection of dengue help?", answer: "Early detection helps prevent severe cases of dengue, ensuring timely medical intervention." },
    { question: "What machine learning technique is used for dengue prediction?", answer: "Weighted Random Forest (WRF) is used to accurately predict dengue disease outbreaks." },

    { question: "What is malaria?", answer: "Malaria is a life-threatening disease transmitted through the bite of infected mosquitoes, causing fever, chills, and flu-like illness." },
    { question: "How does the platform predict malaria?", answer: "The platform uses deep learning models such as CNN and ResNet50 to predict malaria based on medical data." },
    { question: "What are the symptoms of malaria?", answer: "Symptoms of malaria include fever, chills, headache, nausea, and muscle pain." },
    { question: "What AI models are used for malaria prediction?", answer: "Deep learning models such as CNN and ResNet50 are used for predicting malaria." },
    
    { question: "What is the role of AI in healthcare?", answer: "AI helps in analyzing large amounts of medical data, predicting diseases, and recommending treatments to improve healthcare outcomes." },
    { question: "What are the benefits of using AI in disease prediction?", answer: "AI increases the accuracy of disease prediction, reduces healthcare costs, and enables early diagnosis, leading to better treatment." },
    { question: "How does AI help in diagnosing diseases?", answer: "AI can analyze complex medical data, such as scans or lab results, to identify patterns that may indicate a disease." },
    
    
    { question: "Who are the team members working on the project?", answer: "The team members are Sheraz Ahmed, Ahsan Yaqoob, and Aqsa Ijaz, students of BS Computer Science at Air University." },
    { question: "What is the main challenge of the Disease Predictor?", answer: "The main challenge is integrating complex machine learning models and ensuring the privacy and security of medical data." },
    { question: "What is the role of Sheraz Ahmed in the project?", answer: "Sheraz Ahmed is responsible for project planning, front-end development, model training, and back-end development." },
    { question: "What is the role of Ahsan Yaqoob in the project?", answer: "Ahsan Yaqoob is responsible for project planning, model training, and back-end development." },
    { question: "What is the role of Aqsa Ijaz in the project?", answer: "Aqsa Ijaz is responsible for front-end development, model training, and project documentation." },
    
   
    { question: "What are the goals of the project?", answer: "The goals are early detection of diseases, reducing healthcare costs, and improving treatment outcomes using machine learning." },
    { question: "What are the objectives of the project?", answer: "Objectives include developing a disease prediction website, integrating Google Maps, and providing chat features with medical advisors." },
    { question: "What does the tablet recommendation feature do?", answer: "In emergencies, the platform suggests tablets with minimal side effects and lowest prices based on user symptoms." },
    { question: "How does the platform ensure data privacy?", answer: "The platform follows strict data privacy measures to protect sensitive medical information and comply with data protection laws." },
   
    { question: "What is diabetes?", answer: "Diabetes is a chronic condition that affects how your body turns food into energy, leading to high blood sugar levels." },
    { question: "How does the platform predict diabetes?", answer: "The platform uses machine learning models to analyze user data and predict the likelihood of diabetes." },
    { question: "What are the symptoms of diabetes?", answer: "Symptoms of diabetes include increased thirst, frequent urination, extreme fatigue, and blurred vision." },
    

    { question: "What is the AI technique used in the platform for disease prediction?", answer: "The platform uses AI techniques like CNN, Random Forest, and Naive Bayes for disease prediction." },
    { question: "How can users chat with medical advisors?", answer: "The platform offers a chat feature where users can consult medical advisors for personalized recommendations." },
    { question: "How does machine learning help in disease prediction?", answer: "Machine learning helps by analyzing large datasets, identifying patterns, and predicting diseases based on the user's medical data." },
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getLevenshteinDistance = (a, b) => {
    const matrix = [];
    let i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    let j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        }
      }
    }
    return matrix[b.length][a.length];
  };

  const findClosestQuestion = (userQuestion) => {
    let closestQuestion = null;
    let closestDistance = Infinity;

    qaData.forEach((qa) => {
      const distance = getLevenshteinDistance(userQuestion.toLowerCase(), qa.question.toLowerCase());
      if (distance < closestDistance) {
        closestDistance = distance;
        closestQuestion = qa;
      }
    });

    return closestQuestion;
  };

  const handleUserInput = () => {
    const userQuestion = input.trim();
    if (userQuestion) {
      setChatLog((prevLog) => [...prevLog, { type: 'user', text: userQuestion }]);
      setInput('');
      setIsThinking(true);

      
      setTimeout(() => {
        const closestQA = findClosestQuestion(userQuestion);
        const response = closestQA ? closestQA.answer : "Sorry, I don't have an answer for that question.";

        setChatLog((prevLog) => [...prevLog, { type: 'bot', text: response }]);
        setIsThinking(false);
      }, 5000); 
    }
  };

  return (
    <div>
      <div className="chat-button" onClick={toggleChat}>
        <FontAwesomeIcon icon={faFacebookMessenger} size="2x" />
      </div>

      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <span>Chat with us</span>
            <button className="close-btn" onClick={toggleChat}>X</button>
          </div>
          <div className="chat-body">
            {chatLog.map((log, index) => (
              <p key={index} className={log.type === 'user' ? 'user-message' : 'bot-message'}>
                {log.text}
              </p>
            ))}
            {isThinking && <p className="bot-message thinking">...</p>} {}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
            />
            <button onClick={handleUserInput}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
