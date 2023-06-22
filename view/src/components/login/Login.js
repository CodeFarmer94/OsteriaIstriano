import { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8030/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Logged in successfully');
        navigate('/menu');
      } else {
        console.error('Login failed');
        Tooltip.show(document.getElementById('login-tooltip'));
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmitLogin} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Non sei ancora registrato? <Link to="/register">Registrati</Link>
        </p>
        <Tooltip id="login-tooltip" place="top" effect="solid" />
      </form>
    </div>
  );
}
