import { useState } from 'react';
import './register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      // Perform your fetch request here
      const response = await fetch('http://localhost:8030/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, gender, location, age }),
      });
      // Handle the response
      if (response.ok) {
        // Successful registration
        console.log('Registered successfully');
      } else {
        // Error handling for failed registration
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmitRegister} className="register-form">
        <h2>Registrati</h2>
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
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="text"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            id="gender"
            type="text"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
