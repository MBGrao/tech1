import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './images/logo2.png';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || '';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/signup`, { username, password });
      setMessage(response.data.message);
      console.log('Navigating to welcome page with username:', username);
      navigate('/welcome', { state: { username } });
    } catch (error) {
      console.error('Signup error:', error);
      let message;
    
      if (error.response) {
        message = error.response.data?.message || 'An unknown error occurred';
      } else if (error.request) {
        message = 'No response received from the server';
      } else {
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
  const username = location.state?.username || 'Guest';

  return (
    <div className="App">
      <div className="signup-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Thanks, {username}!</h2>
        <p className="welcome-text">You have successfully signed up for this promotion. For further assistance talk to agent.</p>
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