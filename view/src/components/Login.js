import { useState } from "react";

export default function Login() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      // Perform your fetch request here
      const response = await fetch('http://localhost:8030/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        credentials: 'include',
        body: JSON.stringify({ username, password}),
      });
      // Handle the response
      if (response.ok) {
        // Successful login
        console.log('Logged in successfully');
      } else {
        // Error handling for failed login
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

    return (
       
          <form onSubmit={handleSubmitLogin} className='login-form'>
            <div className='form-group'>
              <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            </div>
            <div className='form-group'><label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            /></div>
             <input type="submit" value="Login" />
          </form>
          
          )
}