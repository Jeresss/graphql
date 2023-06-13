import React, { useState } from 'react';
import client from '../apolloClient';
import { gql } from '@apollo/client';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const credentials = btoa(`${username}:${password}`);
    console.log('Credentials:', credentials);  

    const response = await fetch('https://01.gritlab.ax/api/auth/signin', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });
    console.log('Response:', response); 
  
    const data = await response.json();
    console.log('Data:', data);
  
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

      console.log('Token:', data);

      // update the loggedIn state
      setLoggedIn(true);
    } else {
      console.error("imhere", data);
      alert('Wrong username or password, please try again.'); 

    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username/Email:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;
