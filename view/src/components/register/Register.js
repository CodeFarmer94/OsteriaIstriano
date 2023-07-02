import { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [surname, setSurname] = useState('');
  const [mobile, setMobile] = useState('')
  const navigate = useNavigate()

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      // Perform your fetch request here
      const response = await fetch('http://localhost:8030/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.toLowerCase(),  password, name, location, surname, mobile }),
      });
      // Handle the response
      if (response.ok) {
        // Successful registration
        console.log('Registered successfully');
        navigate('/login')
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
          <label htmlFor="username">Email</label>
          <input
            id="username"
            type="email"
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
          <label htmlFor="mobile">Numero di Telefono</label>
          <input
            id="mobile"
            type="text"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="location">Indirizzo di Consegna</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Cognome</label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
