import { useState, useEffect } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [surname, setSurname] = useState('');
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState({});

  const navigate = useNavigate()
   useEffect(()=>{
    setError({})
   },[username,password])

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      if(username.length < 5) {
        setError((prev)=> ({...prev,username:'Il nome deve avere almeno 5 caratteri'}))
      }
      if(password.length < 8) {
        setError((prev)=> ({...prev, password:'La password deve avere almeno 8 caratteri'}))
      }
      if(Object.keys(error).length !== 0) {
        return
      }
      const response = await fetch('http://localhost:8030/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.toLowerCase(),
          password,
          name,
          location,
          surname,
          mobile,
        }),
      });
  
      if (response.ok) {
        console.log('Registered successfully');
        navigate('/login');
      } else {
        const data = await response.json();
        setError((prev)=>({...prev,username: data.error}))
        throw new Error(data.error); 
      }
    } catch (error) {
      console.error('An error occurred:', error);
       // Set the error message in the state variable
    }
  };
  

  return (
    <div className="register-container">
      <form onSubmit={handleSubmitRegister} className="register-form">
        <h2>Registrati</h2>
        <div className="form-group">
          <label htmlFor="username">Email<span>{error.username && error.username}</span></label>
          <input
            id="username"
            type="email"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password<span>{error.password && error.password}</span></label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Numero di Telefono</label>
          <input
            id="mobile"
            type="text"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
            required
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="location">Indirizzo di Consegna</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Cognome</label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
