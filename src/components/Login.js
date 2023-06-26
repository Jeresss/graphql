import React, { useState } from 'react';
import client from '../apolloClient';
import { gql } from '@apollo/client';
import './Login.css'; 


function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const credentials = btoa(`${username}:${password}`);
    const response = await fetch('https://01.gritlab.ax/api/auth/signin', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });

    const data = await response.json();  
    if (response.ok) {
      // save the JWT in local storage
      localStorage.setItem('token', data);

      const response = await client.query({
        query: gql`
         query GetUserId {
            user {
              id
            }
         } 
         `,
      });
      const userId = response.data.user.id;
      localStorage.setItem('userId', userId);
      // update the loggedIn state
      setLoggedIn(true);
    } else {
      alert('Wrong username or password, please try again.'); 
    }
  };
  

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="login-label">
        Username/Email:
        <input
          className="login-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="login-label">
        Password:
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input className="login-submit" type="submit" value="Submit" />
    </form>
  );
}

export default Login;
